import styled from 'styled-components'
import ModalForm from '../../components/ModalForm'
import InputForm from '../../components/inputs/InputForm'
import { useRef, useState, useEffect } from 'react'
import { FaPlus, FaFilter } from '../../images/Icons/IconsFontAwesome'

const Articulos = ({ className }) => {

    const [modalNewArticle, setModalNewArticle] = useState(false)
    const [modalInfoArticle, setModalInfoArticle] = useState(false)
    const [modalUpdateArticle, setModalUpdateArticle] = useState(false)
    const [modalFiltersArticle, setModalFiltersArticle] = useState(false)
    const [modalNewGroup, setModalNewGroup] = useState(false)
    const [modalNew, setModalNew] = useState(false)

    const formNewArticle = useRef()
    const formInfoArticle = useRef()
    const formUpdateArticle = useRef()
    const formFiltersArticle = useRef()

    const closeModal = (showModal, modalForm) => {
        showModal(false)
        modalForm.current.reset()
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

                    <button>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
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

    .box-filter button{
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

export default ArticulosPage