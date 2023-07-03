import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import styled from 'styled-components'
import IterableComponent from '../../components/IterableComponent'
import ModalForm from '../../components/ModalForm'
import InputForm from '../../components/inputs/InputForm'
import { decryptText } from '../../global/cryptography'
import Swal from 'sweetalert2'
import Loader from '../../components/Loader'
import NoDataMessage from '../../components/NoDataMessage'
import { FaMagnifyingGlass, FaPlus, FaTrash, FaPenToSquare, FaEye } from '../../images/Icons/IconsFontAwesome'

const Owner = ({ className }) => {
    const [ownerList, setOwnerList] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [textInputSearch, setTextInputSearch] = useState('')
    const [textSearch] = useDebounce(textInputSearch, 1500)
    const [showInputSearch, setShowInputSearch] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [idOwner, setIdOwner] = useState(null)
    const [inputs, setInputs] = useState({
        inputDocNum: '',
        inputName: '',
        inputLastName: '',
        inputTel: '',
        inputEmail: '',
        inputPassword: ''
    })

    const inputSearch = useRef()
    const formView = useRef()
    const formCreate = useRef()
    const formUpdate = useRef()

    const toggleSearchInput = () => setShowInputSearch(!showInputSearch)

    const closeModal = (setClose, formModal) => {
        setClose({
            ...inputs,
            inputDocNum: '',
            inputName: '',
            inputLastName: '',
            inputTel: '',
            inputEmail: '',
            inputPassword: ''
        })
        setClose(false)
        formModal.current.reset()
    }

    const loadOwner = async (filter = '') => {
        setIsFetching(true)
        const response = await fetch('http://localhost:3001/owners' + filter)
        const { dataProcess } = await response.json()

        if (dataProcess === 'Not Owners avaliable') {
            setOwnerList([])
            setTimeout(() => {
                setIsFetching(false)
            }, 500);

            return false
        }

        setOwnerList(dataProcess)
        setTimeout(() => {
            setIsFetching(false)
        }, 500);
    }

    const loadInfoModal = async (idOwner, showodal) => {
        setIsFetching(true)
        const response = await fetch('http://localhost:3001/owners/id/' + idOwner)
        const dataResponse = await response.json()
        const { OwnerInfo } = dataResponse.dataProcess

        if (dataResponse.infoProcess === 'error') {
            setTimeout(() => {
                setIsFetching(false)
            }, 500);

            Swal.fire(
                'Ha ocurrido un error',
                dataResponse.error === 'userNotFound' ? 'Usuario no encontrado' : dataResponse.error,
                'error'
            )
            return false
        }

        setInputs({
            ...inputs,
            inputDocNum: OwnerInfo.cedula,
            inputName: OwnerInfo.nombre,
            inputLastName: OwnerInfo.apellido,
            inputTel: OwnerInfo.telefono,
            inputEmail: OwnerInfo.email,
            inputPassword: decryptText(OwnerInfo.password),
        })

        setIdOwner(idOwner)
        showodal(true)
        setTimeout(() => {
            setIsFetching(false)
        }, 500);
    }

    const handleSubmit = async (action, form) => {
        const [cedula, nombre, apellido, telefono, email, password] = form
        const data = {
            cedula: cedula.value,
            nombre: nombre.value,
            apellido: apellido.value,
            telefono: telefono.value,
            email: email.value,
            password: password.value
        }

        const url = action === 'create' ? 'http://localhost:3001/owners/createOwner' : 'http://localhost:3001/owners/updateOWner/' + idOwner
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

            if (error === 'userNotFound') {
                messageError = 'Usuario no encontrado'
            } else {
                messageError = 'No se pudo crear el usuario, revise bien la informacion enviada'
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
            setIdOwner(null)
            closeModal(setClose, formModal)
            loadOwner()
        })
    }

    const deleteOner = (idOwner) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Deseas eliinar este usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsFetching(true)

                const url = 'http://localhost:3001/owners/deleteOWner/' + idOwner
                const params = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                }

                const response = await fetch(url, params)
                const { infoProcess, error } = await response.json()

                if (infoProcess === 'error') {
                    setTimeout(() => {
                        setIsFetching(false)
                    }, 500);

                    Swal.fire(
                        'Ha ocurrido un error',
                        error === 'userNotFound' ? 'Usuario no encontrado' : error,
                        'error'
                    )
                    return false
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario eliminado'
                })

                loadOwner()
                setTimeout(() => {
                    setIsFetching(false)
                }, 500);

            }
        })
    }

    useEffect(() => {
        loadOwner()
    }, [])

    useEffect(() => {
        loadOwner('/' + textSearch)
    }, [textSearch])

    return (
        <div className={className}>

            {isFetching && <Loader />}

            <div>
                <div className='title-page' onMouseLeave={() => setShowInputSearch(false)} >
                    <h2>Owners</h2>

                    <div className='box-filter'>
                        <button onMouseEnter={() => setShowInputSearch(true)} onClick={() => toggleSearchInput(true)} >
                            {FaMagnifyingGlass}
                        </button>

                        <button title='Nuevo Owner' onClick={() => setModalCreate(true)} >
                            {FaPlus}
                        </button>

                        <input
                            type="text"
                            placeholder='Owner...'
                            className={showInputSearch ? 'active' : ''}
                            ref={inputSearch}
                            onBlur={() => setShowInputSearch(false)}
                            onChange={() => setTextInputSearch(inputSearch.current.value)}
                        />
                    </div>
                </div>

                <div className='content-page'>
                    {
                        ownerList.length > 0 ?
                            ownerList.map(({ id, nombre, apellido }) => (
                                <IterableComponent key={id} title={nombre + ' ' + apellido} description=' '
                                    methods={[
                                        { description: FaEye, action: () => loadInfoModal(id, setModalView) },
                                        { description: FaPenToSquare, action: () => loadInfoModal(id, setModalUpdate) },
                                        { description: FaTrash, action: () => deleteOner(id) },
                                    ]}
                                />
                            ))
                            :
                            <NoDataMessage>
                                <div>
                                    <h1>Upss!<br /> <span>No hay Owners registrados todavía.</span></h1>
                                </div>
                            </NoDataMessage>
                    }
                </div>
            </div>

            <ModalForm titleModal='Información Owner' active={modalView} formModal={formView} setClose={setModalView} method={closeModal}>
                <form ref={formView}>
                    <InputForm isBlock type='number' text='Cedula' value={inputs.inputDocNum} />
                    <InputForm isBlock type='text' text='Nombre' value={inputs.inputName} />
                    <InputForm isBlock type='text' text='Apellido' value={inputs.inputLastName} />
                    <InputForm isBlock type='text' text='Telefono' value={inputs.inputTel} />
                    <InputForm isBlock type='email' text='Email' value={inputs.inputEmail} />
                    <InputForm isBlock type='text' text='Contraseña' value={inputs.inputPassword} />
                </form>
            </ModalForm>

            <ModalForm titleModal='Nuevo Owner' active={modalCreate} formModal={formCreate} setClose={setModalCreate} method={closeModal}>
                <form ref={formCreate} onSubmit={(event) => { event.preventDefault(); handleSubmit('create', event.target) }}>
                    <InputForm type='number' text='Cedula' />
                    <InputForm type='text' text='Nombre' />
                    <InputForm type='text' text='Apellido' />
                    <InputForm type='text' text='Telefono' />
                    <InputForm type='email' text='Email' />
                    <InputForm type='password' text='Contraseña' />
                    <input type="submit" value='Guardar' />
                </form>
            </ModalForm>

            <ModalForm titleModal='Editar información Owner' active={modalUpdate} formModal={formUpdate} setClose={setModalUpdate} method={closeModal}>
                <form ref={formUpdate} onSubmit={(event) => { event.preventDefault(); handleSubmit('update', event.target) }}>
                    <InputForm active type='number' text='Cedula' value={inputs.inputDocNum} />
                    <InputForm active type='text' text='Nombre' value={inputs.inputName} />
                    <InputForm active type='text' text='Apellido' value={inputs.inputLastName} />
                    <InputForm active type='text' text='Telefono' value={inputs.inputTel} />
                    <InputForm active type='email' text='Email' value={inputs.inputEmail} />
                    <InputForm active type='password' text='Contraseña' value={inputs.inputPassword} />
                    <input type="submit" value='Editar' />
                </form>
            </ModalForm>

        </div>
    )
}

const OwnerPage = styled(Owner)`

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

export default OwnerPage