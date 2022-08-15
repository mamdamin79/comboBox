import { useEffect } from "react";
import { useState } from "react";
import { getData } from "../../services/api"
import styles from "../ComboBox/comboBox.module.css";
import { BiChevronDown } from "react-icons/bi";

const ComboBox = () => {
    const [searchTerm , setSearchTerm] = useState("")
    const [isOpen ,setIsOpen] = useState(false);
    const [products , setProducts] = useState([]);
    console.log(products)

    useEffect(()=>{
        const callApi = async () => {
            setProducts(await getData());
        }
        callApi();
    },[])
    return (
        <div className={styles.container}>
            {
                products.length > 0 ? 
                <>
                    <div className={styles.inputContainer}>
                        <input className={styles.input} value={searchTerm} onChange={(e) =>{
                            setSearchTerm(e.target.value)
                            setIsOpen(true)
                        }} type="text" name="search-term" />
                        <BiChevronDown style={{cursor : 'pointer', fontSize: "20px"}} onClick={(e) => setIsOpen(!isOpen)}/>
                    </div>
                    <div className={isOpen ? styles.productsContainer : styles.hidden}>
                        {
                            products.slice(0,12).filter(product => product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())).map(product => <div onClick={() =>{
                                setSearchTerm(product.title)
                                setIsOpen(false);

                            }}className={styles.product} key={product.id}>{product.title}</div>)
                        }
                    </div> 
                </>
                : <p>loading...</p>

            }
        </div>
    );
}
 
export default ComboBox;