import styled from 'styled-components'
import ModalOption from '../../components/ModalOption'
import ModalForm from '../../components/ModalForm'
import InputForm from '../../components/inputs/InputForm'
import MenuList from '../../components/MenuList'
import { useRef, useState, useEffect } from 'react'
import { FaPlus, FaFilter } from '../../images/Icons/IconsFontAwesome'

const Articulos = ({ className }) => {

    //*modals
    const [modalNewArticle, setModalNewArticle] = useState(false)
    const [modalInfoArticle, setModalInfoArticle] = useState(false)
    const [modalUpdateArticle, setModalUpdateArticle] = useState(false)
    const [modalFiltersArticle, setModalFiltersArticle] = useState(false)
    const [modalGestionGrupos, setModalGestionGrupos] = useState(false)
    const [modalGestionMarcas, setModalGestionMarcas] = useState(false)
    const [modalNewGrupo, setModalNewGrupo] = useState(false)
    const [modalUpdateGrupo, setModalUpdateGrupo] = useState(false)
    const [modalDeleteGrupo, setModalDeleteGrupo] = useState(false)
    const [modalNewMarca, setModalNewMarca] = useState(false)
    const [modalUpdateMarca, setModalUpdateMarca] = useState(false)
    const [modalDeleteMarca, setModalDeleteMarca] = useState(false)

    //* forms
    const formNewArticle = useRef()
    const formInfoArticle = useRef()
    const formUpdateArticle = useRef()
    const formFiltersArticle = useRef()
    const formNewGrupo = useRef()
    const formUpdateGrupo = useRef()
    const formDeleteGrupo = useRef()
    const formNewMarca = useRef()
    const formUpdateMarca = useRef()
    const formDeleteMarca = useRef()
    
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

    return (
        <div className={className}>
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
                            {description: 'Gestion de grupos', action: () => setModalGestionGrupos(true)},
                            {description: 'Gestion de marcas', action: () => console.log('gestion de Grupos')}
                        ]}

                    />
                </div>
            </div>

            <div className='content-page'> 
                
            </div>

            <ModalForm
                titleModal='Nuevo articulo'
                active={modalNewArticle}
                formModal={formNewArticle}
                setClose={setModalNewArticle}
                method={closeModal}
            >
                <form ref={formNewArticle}>
                    <InputForm type='number' text='Código de barras' min='0'/>
                    <InputForm type='text' text='Nombre'/>
                    <InputForm type='number' text='Cantidad' min='0'/>
                    <InputForm type='number' text='Precio de venta' min='0'/>
                    <InputForm type='number' text='Porcentaje de IVA' min='0'/>
                    <InputForm type='number' text='Precio de compra' min='0'/>
                    <InputForm type='number' text='Unidad minima de venta' min='0'/>
                    <InputForm type='number' text='Notificacion de cantidad' min='0'/>
                    <InputForm type='text' text='Marca del articulo'/>
                    <InputForm type='text' text='Grupo del articulo'/>
                    <InputForm type='text' text='Información adicional'/>
                    <InputForm type='text' text='Margen de ganancia'/>
                </form>   
            </ModalForm>

            <ModalForm
                titleModal='Filtros de busqueda'
                active={modalFiltersArticle}
                formModal={formInfoArticle}
                setClose={setModalFiltersArticle}
                method={closeModal}
            >
                <form ref={formInfoArticle}>
                    <InputForm type='text' text='campo'/>
                </form>   
            </ModalForm>

            {/*//*modales gestion de grupos  */}
            <ModalOption
                titleModal='Gestion de grupos'
                active={modalGestionGrupos}
                setClose={setModalGestionGrupos}
                method={closeModal}
            >
                <ButtonOption onClick={()=>{
                    setModalGestionGrupos(false)
                    setModalNewGrupo(true)
                }}>
                    Crear nuevo grupo
                </ButtonOption>

                <ButtonOption onClick={()=>{
                    setModalGestionGrupos(false)
                    setModalUpdateGrupo(true)
                }}>
                    Actualizar grupo
                </ButtonOption>

                <ButtonOption onClick={()=>{
                    setModalGestionGrupos(false)
                    setModalDeleteGrupo(true)
                }}>
                    Eliminar grupo
                </ButtonOption>
            </ModalOption>

            <ModalForm
                titleModal='Nuevo grupo'
                active={modalNewGrupo}
                formModal={formNewGrupo}
                setClose={setModalNewGrupo}
                method={closeModal}
                back={true}
                modalBack={setModalGestionGrupos}
            >
                <form ref={formNewGrupo}>
                    <InputForm type='text' text='Nombre grupo' />
                    <input type='submit' value='Guardar' />
                </form>
            </ModalForm>

            <ModalForm
                titleModal='Editar grupo'
                active={modalUpdateGrupo}
                formModal={formUpdateGrupo}
                setClose={setModalUpdateGrupo}
                method={closeModal}
                back={true}
                modalBack={setModalGestionGrupos}
            >
                <form ref={formUpdateGrupo}>
                    <InputForm type='text' text='Nombre grupo' />
                    <input type='submit' value='Guardar' />
                </form>
            </ModalForm>

            <ModalForm
                titleModal='Eliminar grupo'
                active={modalDeleteGrupo}
                formModal={formDeleteGrupo}
                setClose={setModalDeleteGrupo}
                method={closeModal}
                back={true}
                modalBack={setModalGestionGrupos}
            >
                <form ref={formDeleteGrupo}>
                    <InputForm type='text' text='Nombre grupo' />
                    <input type='submit' value='Guardar' />
                </form>
            </ModalForm>
            {/*//*modales gestion de grupos - cierre */}
            
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