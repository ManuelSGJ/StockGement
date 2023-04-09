import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import styled from 'styled-components'
import IterableComponent from '../../components/owner/IterableComponent'
import ModalOwner from '../../components/owner/ModalOwner'
import InputForm from '../../components/inputs/InputForm'
import Swal from 'sweetalert2'
import Loader from '../../global/Loader'
import { FaMagnifyingGlass, FaPlus, FaTrash, FaPenToSquare, FaEye } from '../../components/Icons/IconsFontAwesome'

const Empresas = ({ className }) => {

    const [empresasList, setIdEmpresasList] = useState([])
    const [showInputSearch, setShowInputSearch] = useState(false)
    const [textInputSearch, setTextInputSearch] = useState('')
    const [textSearch] = useDebounce(textInputSearch, 1000)
    const [isFetching, setIsFetching] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [idEmpresa, setIdEmpresa] = useState(null)

    const inputSearch = useRef()
    const formView = useRef()
    const formCreate = useRef()
    const formUpdate = useRef()

    const toggleSearchInput = () => setShowInputSearch(!showInputSearch)
    const closeModal = (setClose, formModal) => {
        setClose(false)
        formModal.current.reset()
    }

    const loadEmpresas = async(filter = '') => {
        setIsFetching(true)
        const response = await fetch('http://localhost:3001/empresas'+filter)
        const {dataProcess} = await response.json()

        console.log(dataProcess);

        if (dataProcess === 'Not empresas Uvaliable') {
            setIdEmpresasList([])
            setTimeout(() => {
                setIsFetching(false)
            }, 500);
            return false
        }

        setIdEmpresasList(dataProcess)
        setIsFetching(false)
    }

    const loadInfoModal = async(id, modalForm, showModal) => {
        setIsFetching(true)
        const [nit, razonSocial, personaResponsable, direccion, fechaExpLicencia] = modalForm.current
        const response = await fetch('http://localhost:3001/empresas/id/'+id)
        const {infoProcess, error, dataProcess} = await response.json()

        if (infoProcess === 'error') {
            setTimeout(() => {
                setIsFetching(false)
            }, 500);

            Swal.fire(
                'Ha ocurrido un error',
                error === 'empresaNotFound' ? 'Empresa no encontrada' : error,
                'error'
            )
            return false
        }
        
        nit.value = dataProcess.empresa_NIT
        razonSocial.value = dataProcess.empresa_razon_social
        personaResponsable.value = dataProcess.empresa_persona_responsable
        direccion.value = dataProcess.empresa_direccion
        fechaExpLicencia.value = dataProcess.empresa_fecha_licencia

        setIdEmpresa(id)
        showModal(true)
        setTimeout(() => {
            setIsFetching(false)
        }, 500);
    }

    const handleSubmit = async (action, form) => {
        const [nit, razonSocial, personaResponsable, direccion, fechaExpLicencia] = form
        const data = {
            nit: nit.value,
            razonSocial: razonSocial.value,
            personaResponsable: personaResponsable.value,
            direccion: direccion.value,
            fechaExpLicencia: fechaExpLicencia.value
        }

        const url = action === 'create' ? 'http://localhost:3001/empresas/createEmpresa' : 'http://localhost:3001/empresas/updateEmpresa/' + idEmpresa
        const method = action === 'create' ? 'POST' : 'PUT'
        const params = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        const setClose = action === 'create' ? setModalCreate : setModalUpdate
        const formModal = action === 'create' ? formCreate : formUpdate

        const response = await fetch(url, params)
        const dataResponse = await response.json()

        if (dataResponse.infoProcess === 'success') {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: action === 'create' ? 'Empresa creado exitosamente' : 'Empresa actualizado exitosamente',
                showConfirmButton: false,
            }).then(() => {
                setIdEmpresa(null)
                closeModal(setClose, formModal)
            })

            loadEmpresas()
        } else {
            let messageError;

            if (dataResponse.error === 'empresaNotFound') {
                messageError = 'Empresa no encontrado'
            }else {
                messageError = 'No se pudo crear la empresa, revise bien la informacion enviada'
            }

            Swal.fire(
                'Ha ocurrido un error',
                messageError,
                'error'
            )

        }
    }

    const deleteEmpresa = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Deseas eliinar este empresa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then(async (result) => {
            if (result.isConfirmed) {
                
                const url = 'http://localhost:3001/empresas/deleteEmpresa/' + id
                const params = {
                    method: 'DELETE', 
                    headers: { 'Content-Type': 'application/json' }
                }

                const result = await fetch(url, params)
                const {infoProcess, error, dataProcess} = await result.json()

                if (infoProcess === 'error') {
                    setTimeout(() => {
                        setIsFetching(false)
                    }, 500);
                    
                    Swal.fire(
                        'Ha ocurrido un error',
                        error === 'empresaNotFound' ? 'Empresa no encontradad' : error,
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
                    title: 'Empresa eliminada',
                    showConfirmButton: false,
                }).then(() => {
                    loadEmpresas()
                })
            }
        })
    }

    useEffect(() => {
        loadEmpresas()
    }, [])

    useEffect(() => {
        loadEmpresas('/'+textSearch)
    }, [textSearch])

    return (
        <div className={className}>

            { isFetching && <Loader/> }

            <div className='title-page' onMouseLeave={() => setShowInputSearch(false)} >
                <h2>Empresas</h2>

                <div className='box-filter'>
                    <button onMouseEnter={() => setShowInputSearch(true)} onClick={() => toggleSearchInput(true)} >
                        {FaMagnifyingGlass}
                    </button>

                    <button onClick={() => setModalCreate(true)} >
                        {FaPlus}
                    </button>

                    <input
                        type="text"
                        placeholder='Empresa...'
                        className={showInputSearch ? 'active' : ''}
                        ref={inputSearch}
                        onBlur={() => setShowInputSearch(false)}
                        onChange={() => setTextInputSearch(inputSearch.current.value)}
                    />
                </div>
            </div>

            <div className='content-page'>
                {
                    empresasList.length > 0 ?
                    empresasList.map(({empresa_NIT: id, empresa_razon_social: nombre, empresa_fecha_licencia: fechaExp }) => (
                            <IterableComponent
                                key={id}
                                title={nombre}
                                description={`Fexha exp licencia: `+fechaExp}
                                methods={[
                                    { description: FaEye, action: () => loadInfoModal(id, formView, setModalView) },
                                    { description: FaPenToSquare, action: () => loadInfoModal(id, formUpdate, setModalUpdate) },
                                    { description: FaTrash, action: () => deleteEmpresa(id) },
                                ]}
                            />
                        )
                    )
                    :
                    <h1>No hay empresas disponibles</h1>
                }
            </div>

            <ModalOwner
                titleModal='Información Empresa'
                active={modalView}
                formModal={formView}
                setClose={setModalView}
                method={closeModal}
            >
                <form ref={formView}>
                    <InputForm isBlock type='number' text='Nit Empresa' />
                    <InputForm isBlock type='text' text='Razon Social' />
                    <InputForm isBlock type='text' text='Persona responsable' />
                    <InputForm isBlock type='text' text='Dirección' />
                    <InputForm isBlock type='date' text='Fecha de licencia' />
                </form>
            </ModalOwner>

            <ModalOwner
                titleModal='Nueva Empresa'
                active={modalCreate}
                formModal={formCreate}
                setClose={setModalCreate}
                method={closeModal}
            >
                <form ref={formCreate} onSubmit={(event) => { event.preventDefault(); handleSubmit('create', event.target) }}>
                    <InputForm type='number' text='Nit Empresa' />
                    <InputForm type='text' text='Razon Social' />
                    <InputForm type='text' text='Persona responsable' />
                    <InputForm type='text' text='Dirección' />
                    <InputForm type='date' text='Fecha de licencia' />
                    <input type="submit" value='Guardar' />
                </form>
            </ModalOwner>

            <ModalOwner
                titleModal='Editar información empresa'
                active={modalUpdate}
                formModal={formUpdate}
                setClose={setModalUpdate}
                method={closeModal}
            >
                <form ref={formUpdate} onSubmit={(event) => { event.preventDefault(); handleSubmit('update', event.target) }}>
                    <InputForm type='number' text='Nit Empresa' />
                    <InputForm type='text' text='Razon Social' />
                    <InputForm type='text' text='Persona responsable' />
                    <InputForm type='text' text='Dirección' />
                    <InputForm type='date' text='Fecha de licencia' />
                    <input type="submit" value='Editar' />
                </form>
            </ModalOwner>

        </div>
    )
}



const EmpresasPage = styled(Empresas)`

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

export default EmpresasPage