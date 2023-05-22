import styled from 'styled-components'
import { FaPlus, FaFilter } from '../../images/Icons/IconsFontAwesome'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css"; 

const Ventas = ({ className }) => {
    return (
        <div className={className}>

            <div className='title-page'>
                <h2>Usuarios</h2>

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

const ventasPage = styled(Ventas)`

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

export default ventasPage