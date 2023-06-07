import styled from 'styled-components'
import InputForm from '../../components/inputs/InputForm'
import IterableComponent from '../../components/IterableComponent'
import Loader from '../../components/Loader'
import MenuList from '../../components/MenuList'
import ModalForm from '../../components/ModalForm'
import ModalOption from '../../components/ModalOption'
import NoDataMessage from '../../components/NoDataMessage'
import useDataList from '../../global/useDataList'
import Swal from 'sweetalert2'
import { useRef, useState, useEffect } from 'react'
import { getToLocalStorage } from '../../global/manageLocalStorage'
import { FaPlus, FaFilter, FaPenToSquare, FaTrash } from '../../images/Icons/IconsFontAwesome'

const Articulos = ({ className }) => {

    //* states process
    const [isFetching, setIsFetching] = useState(false)

    //* states info
    const [listGroups, setListGroups] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [datalistGroups, setDatalistGroups] = useDataList()
    const [datalistBrands, setDatalistBrands] = useDataList()

    //*states modals
    const [modalNewArticle, setModalNewArticle] = useState(false)
    const [modalFiltersArticle, setModalFiltersArticle] = useState(false)
    const [modalGestionGroups, setModalGestionGroups] = useState(false)
    const [modalGestionBrands, setModalGestionBrands] = useState(false)
    const [modalNewGroup, setModalNewGroup] = useState(false)
    const [modalViewGroup, setModalViewGroup] = useState(false)
    const [modalNewBrand, setModalNewBrand] = useState(false)
    const [modalViewBrand, setModalViewBrand] = useState(false)

    //* forms
    const formNewArticle = useRef()
    const formInfoArticle = useRef()
    const formNewGroup = useRef()
    const formNewBrand = useRef()

    //* effects
    useEffect(() => {
        loadGroups()
        loadBrands()
    }, [])

    //*methods
    const closeModal = (showModal, modalForm, backModal) => {
        if (modalForm) {
            modalForm.current.reset()
        }
        showModal(false)

        if (backModal) {
            backModal(true)
        }
    }

    const handleConfirm = (type, id, nextStep, word) => {
        if (type === 'update') {
            Swal.fire({
                title: 'Ingrese el nuevo nombre para: ' + word,
                confirmButtonText: 'Actualizar',
                confirmButtonColor: '#54B9D9',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#333333',
                showCancelButton: true,
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    nextStep('update', result.value, id)
                }
            })
        }

        if (type === 'delete') {
            Swal.fire({
                title: 'Estas seguro de eliminar: ' + word,
                confirmButtonText: 'Si',
                confirmButtonColor: '#54B9D9',
                cancelButtonText: 'No',
                cancelButtonColor: '#333333',
                showCancelButton: true,
                icon: 'question'
            }).then((result) => {
                if (result.isConfirmed) {
                    nextStep('delete', word, id)
                }
            })
        }
    }

    const handleSubmitArticles = async (typeAction, form) => { 
        let  url, method

        const [artCode, artName, artSalePrice, artPercentajeIVA, artPurchasePrice, artUnitMinSale, artNotifyCant, artBrand, artGroup, artInfoAditional, artMarginGain] = form

        const data = {
            artCode,
            artName,
            artSalePrice,
            artPercentajeIVA,
            artPurchasePrice,
            artUnitMinSale,
            artNotifyCant,
            artBrand,
            artGroup,
            artInfoAditional,
            artMarginGain
        }

        if (typeAction === 'create') {
            method = 'POST'
            url = 'http://localhost:3001/admins/createArticle'
        }

        if (typeAction === 'update') {
            method = 'PUT'
            url = 'http://localhost:300/admins/updateArticle'
        }

        const params = {
            method,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }

        const response = await fetch(url, params)
        const dataResponse = await response.json()

        console.log(dataResponse);
    }

    const handleSubmitGroups = async (typeAction, valueGroup, idGroup) => {
        let url, method
        let form = null
        let setClose = setModalViewGroup

        if (!valueGroup.trim()) {
            Swal.fire({
                title: 'Datos inválidos',
                icon: 'info'
            })
            return false
        }

        if (typeAction === 'create') {
            form = formNewGroup
            setClose = setModalNewGroup
            method = 'POST'
            url = 'http://localhost:3001/admins/createGroup'
        }

        if (typeAction === 'update') {
            method = 'PUT'
            url = 'http://localhost:3001/admins/updateGroup'
        }

        if (typeAction === 'delete') {
            method = 'DELETE'
            url = 'http://localhost:3001/admins/deleteGroup'
        }

        const params = {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                nameGroup: valueGroup,
                empresaGroup: getToLocalStorage('userInfo', 'empresa'),
                idGroup: idGroup ? idGroup : ''
            })
        }

        const response = await fetch(url, params)
        const { error, infoProcess } = await response.json()

        if (infoProcess === 'error') {
            let messageError = (error === 'groupNotFound') ? 'Grupo no encontrado' : 'No se pudo crear el grupo, revise le información enviada';

            Swal.fire(
                'Ha ocurrido un error',
                messageError,
                'error'
            )
            return false
        }

        Swal.fire({
            title: 'operacion exitosa!',
            icon: 'success',
        }).then(() => {
            closeModal(setClose, form, setModalGestionGroups)
            loadGroups()
        })
    }

    const handleSubmitBrands = async (typeAction, valueBrand, idBrand) => {
        let url, method
        let form = null
        let setClose = setModalViewBrand

        if (!valueBrand.trim()) {
            Swal.fire({
                title: 'Datos inválidos',
                icon: 'info'
            })
            return false
        }

        if (typeAction === 'create') {
            form = formNewBrand
            setClose = setModalNewBrand
            method = 'POST'
            url = 'http://localhost:3001/admins/createBrand'
        }

        if (typeAction === 'update') {
            method = 'PUT'
            url = 'http://localhost:3001/admins/updateBrand'
        }

        if (typeAction === 'delete') {
            method = 'DELETE'
            url = 'http://localhost:3001/admins/deleteBrand'
        }

        const params = {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                nameBrand: valueBrand,
                empresaBrand: getToLocalStorage('userInfo', 'empresa'),
                idBrand: idBrand ? idBrand : ''
            })
        }

        const response = await fetch(url, params)
        const { error, infoProcess } = await response.json()

        if (infoProcess === 'error') {
            let messageError = (error === 'brandNotFound') ? 'Marca no encontrada' : 'No se pudo crear la marca, revise le información enviada';

            Swal.fire(
                'Ha ocurrido un error',
                messageError,
                'error'
            )
            return false
        }

        Swal.fire({
            title: 'operacion exitosa!',
            icon: 'success',
        }).then(() => {
            closeModal(setClose, form, setModalGestionBrands)
            loadBrands()
        })
    }

    const loadGroups = async () => {
        setIsFetching(true)
        const params = new URLSearchParams()
        params.append('empresa', getToLocalStorage('userInfo', 'empresa'))

        const response = await fetch('http://localhost:3001/admins/findGroups?' + params.toString())
        const { dataProcess } = await response.json()

        if (dataProcess === 'groups not found') {
            
            setListGroups([])
            setIsFetching(false)
            return false
        }

        const allowedKeys = ['Grupo_codigo', 'Grupo_nombre']

        setDatalistGroups([dataProcess, allowedKeys])
        setListGroups(dataProcess)
        setIsFetching(false)
    }

    const loadBrands = async () => {
        setIsFetching(true)
        const params = new URLSearchParams()
        params.append('empresa', getToLocalStorage('userInfo', 'empresa'))

        const response = await fetch('http://localhost:3001/admins/findBrands?' + params.toString())
        const { dataProcess } = await response.json()

        if (dataProcess === 'brands not found') {
            setListBrands([])
            setIsFetching(false)
            return false
        }

        const allowedKeys = ['Marca_codigo', 'Marca_nombre']
        
        setDatalistBrands([dataProcess, allowedKeys])
        setListBrands(dataProcess)
        setIsFetching(false)
    }

    return (
        <div className={className}>

            {isFetching && <Loader />}

            <div className='title-page'>
                <h2>Articulos</h2>

                <div className='box-filter'>
                    <button onClick={() => setModalNewArticle(true)}>
                        {FaPlus}
                    </button>
                    <button onClick={() => setModalFiltersArticle(true)}>
                        {FaFilter}
                    </button>

                    <MenuList
                        size='large'
                        items={[
                            { description: 'Gestion de grupos', action: () => setModalGestionGroups(true) },
                            { description: 'Gestion de marcas', action: () => setModalGestionBrands(true) }
                        ]}
                    />
                </div>
            </div>

            <div className='content-page'>

            </div>

            <ModalForm titleModal='Nuevo articulo' active={modalNewArticle} formModal={formNewArticle} setClose={setModalNewArticle} method={closeModal}>
                <form ref={formNewArticle} onSubmit={(evt) => {evt.preventDefault(); handleSubmitArticles('create', formNewArticle.current)}}>
                    <InputForm type='number' text='Código de barras' min='0' />
                    <InputForm type='text' text='Nombre' />
                    <InputForm type='number' text='Cantidad' min='0' />
                    <InputForm type='number' text='Precio de venta' min='0' />
                    <InputForm type='number' text='Porcentaje de IVA' min='0' />
                    <InputForm type='number' text='Precio de compra' min='0' />
                    <InputForm type='number' text='Unidad minima de venta' min='0' />
                    <InputForm type='number' text='Notificacion de cantidad' min='0' />
                    <InputForm 
                        type='dataInput' 
                        text='Marca del articulo' 
                        datalist={{
                            data: datalistBrands,
                            nameList: 'listBrands'
                        }}
                    />
                    <InputForm 
                        type='dataInput' 
                        text='Grupo del articulo' 
                        datalist={{
                            data: datalistGroups,
                            nameList: 'listGroups'
                        }}
                    />
                    <InputForm type='text' text='Información adicional' />
                    <InputForm type='text' text='Margen de ganancia' />
                    <input type='submit' value='Guardar' />
                </form>
            </ModalForm>

            <ModalForm titleModal='Filtros de busqueda' active={modalFiltersArticle} formModal={formInfoArticle} setClose={setModalFiltersArticle} method={closeModal}>
                <form ref={formInfoArticle}>
                    <InputForm type='text' text='campo' />
                </form>
            </ModalForm>


            {/*//* modales gestion de groups  */}
            <ModalOption titleModal='Gestion de grupos' active={modalGestionGroups} setClose={setModalGestionGroups} method={closeModal}>
                <ButtonOption onClick={() => {
                    setModalGestionGroups(false)
                    setModalNewGroup(true)
                }}>
                    Nuevo grupo
                </ButtonOption>

                <ButtonOption onClick={() => {
                    setModalGestionGroups(false)
                    setModalViewGroup(true)
                }}>
                    Gestionar grupos
                </ButtonOption>
            </ModalOption>

            <ModalForm titleModal='Nuevo grupo' active={modalNewGroup} formModal={formNewGroup} setClose={setModalNewGroup} method={closeModal} back={true} modalBack={setModalGestionGroups}>
                <form ref={formNewGroup} onSubmit={(evt) => {
                    evt.preventDefault()
                    handleSubmitGroups('create', evt.target[0].value, null)
                }}>
                    <InputForm type='text' text='Nombre del grupo' />
                    <input type='submit' value='Guardar' />
                </form>
            </ModalForm>

            <ModalOption titleModal='Mis grupos' active={modalViewGroup} setClose={setModalViewGroup} method={closeModal} back={true} modalBack={setModalGestionGroups}>
                {
                    listGroups.length > 0 ?
                        listGroups.map(({ Grupo_codigo, Grupo_nombre }) => (
                            <IterableComponent
                                key={Grupo_codigo}
                                title={Grupo_nombre}
                                description=' '
                                smallMargin={true}
                                methods={[
                                    { description: FaPenToSquare, action: () => handleConfirm('update', Grupo_codigo, handleSubmitGroups, Grupo_nombre) },
                                    { description: FaTrash, action: () => handleConfirm('delete', Grupo_codigo, handleSubmitGroups, Grupo_nombre) }
                                ]}
                            />
                        ))
                        :
                        <NoDataMessage small>
                            <div>
                                <h1>Upss!<br /> <span>No hay grupos registrados todavía.</span></h1>
                            </div>
                        </NoDataMessage>
                }
            </ModalOption>
            {/*//* modales gestion de groups - cierre */}


            {/*//* modales gestion de marcas  */}
            <ModalOption titleModal='Gestion de marcas' active={modalGestionBrands} setClose={setModalGestionBrands} method={closeModal}>
                <ButtonOption onClick={() => {
                    setModalGestionBrands(false)
                    setModalNewBrand(true)
                }}>
                    Nueva marca
                </ButtonOption>

                <ButtonOption onClick={() => {
                    setModalGestionBrands(false)
                    setModalViewBrand(true)
                }}>
                    Gestionar marcas
                </ButtonOption>
            </ModalOption>

            <ModalForm titleModal='Nueva marca' active={modalNewBrand} formModal={formNewBrand} setClose={setModalNewBrand} method={closeModal} back={true} modalBack={setModalGestionBrands}>
                <form ref={formNewBrand} onSubmit={(evt) => {
                    evt.preventDefault()
                    handleSubmitBrands('create', evt.target[0].value, null)
                }}>
                    <InputForm type='text' text='Nombre de la marca' />
                    <input type='submit' value='Guardar' />
                </form>
            </ModalForm>

            <ModalOption titleModal='Mis marcas' active={modalViewBrand} setClose={setModalViewBrand} method={closeModal} back={true} modalBack={setModalGestionBrands}>
                {
                    listBrands.length > 0 ?
                        listBrands.map(({ Marca_codigo, Marca_nombre }) => (
                            <IterableComponent
                                key={Marca_codigo}
                                title={Marca_nombre}
                                description=' '
                                smallMargin={true}
                                methods={[
                                    { description: FaPenToSquare, action: () => handleConfirm('update', Marca_codigo, handleSubmitBrands, Marca_nombre) },
                                    { description: FaTrash, action: () => handleConfirm('delete', Marca_codigo, handleSubmitBrands, Marca_nombre) }
                                ]}
                            />
                        ))
                        :
                        <NoDataMessage small>
                            <div>
                                <h1>Upss!<br /> <span>No hay marcas registradas todavía.</span></h1>
                            </div>
                        </NoDataMessage>
                }
            </ModalOption>
            {/*//* modales gestion de marcas - cierre */}
        </div>
    )
}

const ArticulosPage = styled(Articulos)`

    .title-page{
        padding: 3rem 2rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-page h2{
        font-size: 2.4rem;
        font-weight: normal;
    }

    .box-filter{
        display: flex;
    }

    .box-filter > button{
        margin: 5px 10px;
        font-size: 20px;
        cursor: pointer;
        min-width: 50px;
        padding: 5px;
        border: none;
        border-radius: 4px;
        background-color: #FAFBFC;
        z-index: 10;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .box-filter button span{
        height: 4px;
        width: 4px;
        margin: 2px 0;
        background-color: #54B9D9;
        border-radius: 50%;
    }

    .content-page{
        padding: 0 2rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

`

const ButtonOption = styled.button`
    margin: 10px;
    padding: 5px 20px;
    width: fit-content;
    height: 40px;
    border: none;
    border-radius: 8px;
    background-color: #F5F5F5;
    box-shadow: 3px 3px 5px 0px rgba(84, 185, 217, .49);
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    :hover{
        background-color: #f0f0f0;
    }
`

export default ArticulosPage