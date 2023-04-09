import { useState, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import styled from 'styled-components'
import IterableComponent from '../../components/owner/IterableComponent'
import ModalOwner from '../../components/owner/ModalOwner'
import InputForm from '../../components/inputs/InputForm'
import Swal from 'sweetalert2'
import Loader from '../../global/Loader'
import { FaMagnifyingGlass, FaPlus, FaTrash, FaPenToSquare, FaEye } from '../../components/Icons/IconsFontAwesome'

const Admin = ({ className }) => {

    const [AdminList, setIdAdminList] = useState([])
    const [showInputSearch, setShowInputSearch] = useState(false)
    const [textInputSearch, setTextInputSearch] = useState('')
    const [textSearch] = useDebounce(textInputSearch, 1000)
    const [isFetching, setIsFetching] = useState(false)
    const [modalView, setModalView] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)
    const [idAdmin, setIdAdmin] = useState(null)
    const [empresas, setEmpresas] = useState([])

    const inputSearch = useRef()
    const formView = useRef()
    const formCreate = useRef()
    const formUpdate = useRef()

    const toggleSearchInput = () => setShowInputSearch(!showInputSearch)
    const closeModal = (setClose, formModal) => {
        setClose(false)
        formModal.current.reset()
    }

    const loadItems = async(filter = '') => {

    }

    const loadEmpresas = async () => {
        setIsFetching(true)
        const response = await fetch('http://localhost:3001/empresas')
        const {dataProcess} = await response.json()

        console.log(dataProcess);

        if (dataProcess === 'Not empresas Uvaliable') {
            setEmpresas([])
            setTimeout(() => {
                setIsFetching(false)
            }, 500);
            return false
        }

        setEmpresas(dataProcess)
        setIsFetching(false)
    }

    const loadInfoModal = async(id, modalForm, showModal) => {

    }

    const handleSubmit = async (action, form) => {
        
    }

    const deleteEmpresa = (id) => {

    }

    useEffect(() => {
        loadItems()
        loadEmpresas()
    }, [])

    useEffect(() => {
        loadItems('/'+textSearch)
    }, [textSearch])

    return (
        <div className={className}>

            { isFetching && <Loader/> }

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
                    AdminList.map((Admin, index) => (
                            <IterableComponent
                                key={index}
                                title={index}
                                description={`Fexha exp licencia: `+index}
                                methods={[
                                    { description: FaEye, action: () => loadInfoModal() },
                                    { description: FaPenToSquare, action: () => loadInfoModal() },
                                    { description: FaTrash, action: () => deleteEmpresa() },
                                ]}
                            />
                        )
                    )
                    :
                    <h1>No hay empresas disponibles</h1>
                }
            </div>

            <ModalOwner
                titleModal='Información Administrador'
                active={modalView}
                formModal={formView}
                setClose={setModalView}
                method={closeModal}
            >
                <form ref={formView}>
                    <InputForm isBlock type='number' text='Cedula' />
                    <InputForm isBlock type='text' text='Nombre' />
                    <InputForm isBlock type='text' text='Apellido' />
                    <InputForm isBlock type='text' text='Telefono' />
                    <InputForm isBlock type='text' text='Dirección' />
                    <InputForm isBlock type='text' text='Empresa' />
                    <InputForm isBlock type='text' text='Contraseña' />
                </form>
            </ModalOwner>

            <ModalOwner
                titleModal='Nuevo Administrador'
                active={modalCreate}
                formModal={formCreate}
                setClose={setModalCreate}
                method={closeModal}
            >
                <form ref={formCreate} onSubmit={(event) => { event.preventDefault(); handleSubmit('create', event.target) }}>
                    <InputForm type='number' text='Cedula' />
                    <InputForm type='text' text='Nombre' />
                    <InputForm type='text' text='Apellido' />
                    <InputForm type='text' text='Telefono' />
                    <InputForm type='text' text='Dirección' />
                    <InputForm type='dataInput' text='Empresa' datalist={{
                        nameList: 'listPrueba',
                        data: empresas
                    }} />
                    <InputForm type='text' text='Contraseña' />
                    <input type="submit" value='Guardar' />
                </form>
            </ModalOwner>

            <ModalOwner
                titleModal='Editar información Administrador'
                active={modalUpdate}
                formModal={formUpdate}
                setClose={setModalUpdate}
                method={closeModal}
            >
                <form ref={formUpdate} onSubmit={(event) => { event.preventDefault(); handleSubmit('update', event.target) }}>
                    <InputForm type='number' text='Cedula' />
                    <InputForm type='text' text='Nombre' />
                    <InputForm type='text' text='Apellido' />
                    <InputForm type='text' text='Telefono' />
                    <InputForm type='text' text='Dirección' />
                    <InputForm type='text' text='Empresa' />
                    <InputForm type='text' text='Contraseña' />
                </form>
            </ModalOwner>

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