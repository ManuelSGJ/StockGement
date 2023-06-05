import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import styled from 'styled-components'
import IterableComponent from '../../components/IterableComponent'
import ModalForm from '../../components/ModalForm'
import InputForm from '../../components/inputs/InputForm'
import Swal from 'sweetalert2'
import Loader from '../../components/Loader'
import NoDataMessage from '../../components/NoDataMessage'
import useDataList from '../../global/useDataList'
import { decryptText } from '../../global/cryptography'
import { FaMagnifyingGlass, FaPlus, FaTrash, FaPenToSquare, FaEye } from '../../images/Icons/IconsFontAwesome'

const Admin = ({ className }) => {

    const [AdminList, setAdminList] = useState([])
    const [showInputSearch, setShowInputSearch] = useState(false)
    const [textInputSearch, setTextInputSearch] = useState('')
    const [textSearch] = useDebounce(textInputSearch, 1500)
    const [isFetching, setIsFetching] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [idAdmin, setIdAdmin] = useState(null)
    const [dataList, setDataList] = useDataList()

    const inputSearch = useRef()
    const formView = useRef()
    const formCreate = useRef()
    const formUpdate = useRef()

    const toggleSearchInput = () => setShowInputSearch(!showInputSearch)
    const closeModal = (setClose, formModal) => {
        setClose(false)
        formModal.current.reset()
    }

    const loadItems = async (filter = '') => {
        setIsFetching(true)
        const response = await fetch('http://localhost:3001/admins' + filter)
        const { dataProcess } = await response.json()

        if (dataProcess === 'Not admins avaliable') {
            setAdminList([])
            setTimeout(() => {
                setIsFetching(false)
            }, 500);
            return false
        }

        setAdminList(dataProcess)
        setIsFetching(false)
    }

    const loadEmpresas = async () => {
        setIsFetching(true)
        const response = await fetch('http://localhost:3001/empresas')
        const { dataProcess } = await response.json()
        const keysAllows = ['empresa_NIT', 'empresa_razon_social', 'empresa_persona_responsable']

        if (dataProcess === 'Not empresas Uvaliable') {
            setTimeout(() => {
                setIsFetching(false)
            }, 500);
            return false
        }

        setDataList([dataProcess, keysAllows])
        setIsFetching(false)
    }

    const loadInfoModal = async (id, modalForm, showModal) => {
        const [cedula, nombre, apellido, telefono, direccion, empresa, password] = modalForm.current
        const response = await fetch('http://localhost:3001/admins/id/' + id)
        const { infoProcess, error, dataProcess } = await response.json()

        if (infoProcess === 'error') {
            setTimeout(() => {
                setIsFetching(false)
            }, 500);

            Swal.fire(
                'Ha ocurrido un error',
                error === 'adminNotFound' ? 'Administrador no encontrado' : error,
                'error'
            )

            return false
        }

        cedula.value = dataProcess.Admin_cedula
        nombre.value = dataProcess.Admin_nombre
        apellido.value = dataProcess.Admin_apellido
        telefono.value = dataProcess.Admin_telefono
        direccion.value = dataProcess.Admin_direccion
        empresa.value = dataProcess.Empresa.empresa_razon_social
        password.value = decryptText(dataProcess.Admin_password)

        setIdAdmin(id)
        showModal(true)
        setTimeout(() => {
            setIsFetching(false)
        }, 500);
    }

    const handleSubmit = async (action, form) => {
        const [cedula, nombre, apellido, telefono, direccion, empresa, password] = form
        const data = {
            cedula: cedula.value,
            nombre: nombre.value,
            apellido: apellido.value,
            telefono: telefono.value,
            direccion: direccion.value,
            empresa: empresa.value.split(' | ', 2)[0],
            password: password.value
        }

        if (!(empresa.value.includes('|'))){
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Seleccione un formato de empresa correcto',
                showConfirmButton: false,
            })

            return false
        }

        const url = action === 'create' ? 'http://localhost:3001/admins/createAdmin' : 'http://localhost:3001/admins/updateAdmin/' + idAdmin
        const method = action === 'create' ? 'POST' : 'PUT'
        const params = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        const setClose = action === 'create' ? setModalCreate : setModalUpdate
        const formModal = action === 'create' ? formCreate : formUpdate

        const response = await fetch(url, params)
        const { error, infoProcess } = await response.json()

        if (infoProcess === 'error') {
            let messageError;

            if (error === 'adminNotFound') {
                messageError = 'Administrador no encontrado'
            } else {
                messageError = 'No se pudo crear el administrador, revise bien la informacion enviada'
            }

            Swal.fire(
                'Ha ocurrido un error',
                messageError,
                'error'
            )

            return false
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: action === 'create' ? 'Usuario creado exitosamente' : 'Usuario actualizado exitosamente',
            showConfirmButton: false,
        }).then(() => {
            setIdAdmin(null)
            closeModal(setClose, formModal)
            loadItems()
        })
    }

    const deleteEmpresa = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Deseas eliinar este administrador?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {

                const url = 'http://localhost:3001/admins/deleteAdmin/' + id
                const params = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                }

                const result = await fetch(url, params)
                const { infoProcess, error } = await result.json()

                if (infoProcess === 'error') {
                    setTimeout(() => {
                        setIsFetching(false)
                    }, 500);

                    Swal.fire(
                        'Ha ocurrido un error',
                        error === 'adminNotFound' ? 'Admin no encontrado' : error,
                        'error'
                    )

                    return false
                }

                setTimeout(() => {
                    setIsFetching(false)
                }, 500);

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Admin eliminado',
                    showConfirmButton: false,
                }).then(() => {
                    loadItems()
                })
            }
        })
    }

    useEffect(() => {
        loadItems()
        loadEmpresas()
    }, [])

    useEffect(() => {
        loadItems('/' + textSearch)
    }, [textSearch])

    return (
        <div className={className}>

            {isFetching && <Loader />}

            <div className='title-page' onMouseLeave={() => setShowInputSearch(false)} >
                <h2>Aministradores</h2>

                <div className='box-filter'>
                    <button onMouseEnter={() => setShowInputSearch(true)} onClick={() => toggleSearchInput(true)} >
                        {FaMagnifyingGlass}
                    </button>

                    <button onClick={() => setModalCreate(true)} >
                        {FaPlus}
                    </button>

                    <input
                        type="text"
                        placeholder='Administrador...'
                        className={showInputSearch ? 'active' : ''}
                        ref={inputSearch}
                        onBlur={() => setShowInputSearch(false)}
                        onChange={() => setTextInputSearch(inputSearch.current.value)}
                    />
                </div>
            </div>

            <div className='content-page'>
                {
                    AdminList.length > 0 ?
                        AdminList.map(({ Admin_cedula: id, Admin_nombre: nombre, Admin_apellido: apellido, Empresa: { empresa_razon_social: empresa } }) => (
                            <IterableComponent key={id} title={nombre + ' ' + apellido} description={empresa}
                                methods={[
                                    { description: FaEye, action: () => loadInfoModal(id, formView, setModalView) },
                                    { description: FaPenToSquare, action: () => loadInfoModal(id, formUpdate, setModalUpdate) },
                                    { description: FaTrash, action: () => deleteEmpresa(id) },
                                ]}
                            />
                        ))
                        :
                        <NoDataMessage>
                            <div>
                                <h1>Upss!<br/> <span>No hay administradores registrados todavía.</span></h1>
                            </div>
                        </NoDataMessage>
                }
            </div>

            <ModalForm titleModal='Información Administrador' active={modalView} formModal={formView} setClose={setModalView} method={closeModal}>
                <form ref={formView}>
                    <InputForm isBlock type='number' text='Cedula' />
                    <InputForm isBlock type='text' text='Nombre' />
                    <InputForm isBlock type='text' text='Apellido' />
                    <InputForm isBlock type='text' text='Telefono' />
                    <InputForm isBlock type='text' text='Dirección' />
                    <InputForm isBlock type='text' text='Empresa' />
                    <InputForm isBlock type='text' text='Contraseña' />
                </form>
            </ModalForm>

            <ModalForm titleModal='Nuevo Administrador' active={modalCreate} formModal={formCreate} setClose={setModalCreate} method={closeModal}>
                <form ref={formCreate} onSubmit={(event) => { event.preventDefault(); handleSubmit('create', event.target) }}>
                    <InputForm type='number' text='Cedula' />
                    <InputForm type='text' text='Nombre' />
                    <InputForm type='text' text='Apellido' />
                    <InputForm type='text' text='Telefono' />
                    <InputForm type='text' text='Dirección' />
                    <InputForm
                        type='dataInput'
                        text='Empresa'
                        datalist={{
                            data: dataList,
                            nameList: 'list-empresas'
                        }}
                    />
                    <InputForm type='text' text='Contraseña' />
                    <input type="submit" value='Guardar' />
                </form>
            </ModalForm>

            <ModalForm titleModal='Editar información Administrador' active={modalUpdate} formModal={formUpdate} setClose={setModalUpdate} method={closeModal}>
                <form ref={formUpdate} onSubmit={(event) => { event.preventDefault(); handleSubmit('update', event.target) }}>
                    <InputForm active type='number' text='Cedula' />
                    <InputForm active type='text' text='Nombre' />
                    <InputForm active type='text' text='Apellido' />
                    <InputForm active type='text' text='Telefono' />
                    <InputForm active type='text' text='Dirección' />
                    <InputForm active type='dataInput' text='Empresa'
                        datalist={{
                            data: dataList,
                            nameList: 'list-empresas-edit'
                        }}
                    />
                    <InputForm active type='text' text='Contraseña' />
                    <input type="submit" value='Editar' />
                </form>
            </ModalForm>
        </div>
    )
}

const AdminPage = styled(Admin)`

    .title-page{
        padding: 3rem 2rem;
        position: relative;
    }

    .title-page h2{
        font-size: 2.4rem;
        font-weight: normal;
    }

    .box-filter{
        position: absolute;
        bottom: 0;
        right: 5%;
        display: flex;
        flex-direction: column;
    }

    .box-filter input{
        position: absolute;
        top: 10%;
        left: -300%;
        padding: 4px;
        border: none;
        transform: translateX(-100%);
        opacity: 0;
        visibility: hidden;
        border-bottom: 1px solid #54B9D9;
        transition: all 0.3s ease-in-out;
        z-index: 5;
    }

    .box-filter input::placeholder{
        color: #e1e1e1;
    }

    .box-filter input.active{
        opacity: 1;
        visibility: visible;
        left: -100%;
    }

    .box-filter button{
        background-color: transparent;
        border: none;
        margin: 5px 0;
        font-size: 20px;
        cursor: pointer;
        z-index: 10;
    }

    .content-page{
        padding: 0 2rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

`

export default AdminPage