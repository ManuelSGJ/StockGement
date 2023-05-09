import styled from 'styled-components'
import { FaPlus, FaFilter } from '../../components/Icons/IconsFontAwesome'

const Articulos = ({ className }) => {

    return (
        <div className={className}>
            <div className='title-page'>
                <h2>Articulos</h2>

                <div className='box-filter'>
                    <button>
                        {FaPlus}
                    </button>

                    <button>
                        {FaFilter}
                    </button>
                </div>
            </div>

            <div className='content-page'> 
                
            </div>
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
    }

    .content-page{
        padding: 0 2rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

`

export default ArticulosPage