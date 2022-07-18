import {
    Button,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid} from "@mui/x-data-grid";

import {useEffect, useState} from "react";
import {getWeekDay, getWeekNumber} from "../utils/Utils";

const HomeScreen = props => {

    const [products, setProducts] = useState([]);
    const [searchProductText, setSearchProductText] = useState("");
    const [cartProducts, setCartProducts] = useState([]);
    const [addBuyModalVisible, setAddBuyModalVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState({method: undefined, entity: undefined});
    const [cart, setCart] = useState({products: [], payment: undefined, purchase_date: undefined});
    const [processedProducts, setProcessedProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            const allProducts = await getProducts();
            setProducts(allProducts);
        };
        getAllProducts().then(() => console.log("Products Loaded"));
    }, []);

    useEffect(() => {

        if (!paymentMethod || !paymentMethod.method || ((paymentMethod.method === "CREDIT" || paymentMethod.method === "DEBIT") && !paymentMethod.entity)) {
            setProcessedProducts([]);
            return;
        }
        calculateOffers();
    }, [paymentMethod, setPaymentMethod]);

    async function getProducts() {
        const response = await fetch('http://localhost:4000/products', {
            method: 'GET',
            headers: {'Authorization': props.token},
        }).catch((err) => {
            console.log(err);
            alert("No se pudo obtener los productos. Intente más tarde")
        })
        const resStatus = response.status;

        if (resStatus >= 200 && resStatus < 300) {
            return response.json();
        } else if (resStatus === 403) {
            props.deleteToken()
        } else {
            alert("No se pudo obtener los productos. Intente más tarde")
        }
    }

    async function getProcessedProducts() {
        const date = new Date();
        const newCart = {
            products: cartProducts,
            payment: paymentMethod,
            purchase_date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day_number: date.getDate(),
                week_day: getWeekDay(date.getDay()),
                week_number: getWeekNumber(date)
            }
        }
        setCart(newCart)
        const response = await fetch('http://localhost:4000/products', {
            method: 'POST',
            headers: {'Authorization': props.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(newCart)
        }).catch((err) => {
            console.log(err);
            alert("No se pudo procesar el carrito. Intente más tarde")
        })
        const resStatus = response.status;

        if (resStatus >= 200 && resStatus < 300) {
            return response.json();
        } else if (resStatus === 403) {
            alert("Tiempo máximo de sesion cumplido");
            props.deleteToken();
        } else {
            alert("No se pudo procesar el carrito. Intente más tarde")
        }
    }

    const handleProductSearchText = (event) => {
        const textInTextBox = event.target.value.toLowerCase();
        setSearchProductText(textInTextBox);
    }

    const filterProducts = filterText => {
        filterText = filterText.toLowerCase();
        return p => p.name.toLowerCase().includes(filterText) || p.category.name.toLowerCase().includes(filterText);
    }

    const renderCategory = (params) => {
        return (params.row.category.name);
    }

    const handlerAddToCart = (params) => {
        setCartProducts([...cartProducts, params.row])
    }

    const handlerDeleteProductCart = (id) => {
        cartProducts.splice(id, 1);
        setCartProducts([...cartProducts])
    }

    const handlerModalOpen = () => setAddBuyModalVisible(true);

    const handlerModalClose = () => {
        setAddBuyModalVisible(false);
        setPaymentMethod({method: undefined, entity: undefined});
        setProcessedProducts([]);
    }


    const calculateOffers = async () => {
        const processed = await getProcessedProducts();
        if (processed === undefined) return;
        setProcessedProducts(processed);
    }

    const handleModalBuy = () => {
        setCartProducts([]);
        setPaymentMethod({method: undefined, entity: undefined});
        setCart({products: [], payment: undefined, purchase_date: undefined});
        handlerModalClose();
    }

    const handlePaymentMethodChange = (event) => {
        if (event.target.value === "CASH" || event.target.value === "MERCADO_PAGO") {
            setPaymentMethod({method: event.target.value, entity: undefined});
        } else {
            setPaymentMethod({method: event.target.value, entity: paymentMethod.entity});
        }
    }

    const handleEntityChange = (event) => {
        setPaymentMethod({method: paymentMethod.method, entity: event.target.value});
    }

    const renderAddToCart = (params) => {
        return (
            <Button variant="contained" style={{float: 'right'}}
                    onClick={() => handlerAddToCart(params)}>
                Añadir al carrito
            </Button>
        );
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Nombre',
            flex: 1
        },
        {
            field: 'category',
            headerName: 'Categoría',
            flex: 0.5,
            renderCell: renderCategory

        },
        {
            field: 'price',
            headerName: 'Precio',
            flex: 0.5
        },
        {
            field: 'add',
            headerName: 'Carrito',
            flex: 0.5,
            renderCell: renderAddToCart
        }
    ];

    return (
        <div style={{
            display: "flex",
            flex: "1",
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 20,
            width: '100%',
            minHeight: window.innerHeight
        }}>
            <div style={{
                flex: "1",
                backgroundColor: '#9acbe7',
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "solid",
            }}>
                <TextField onChange={handleProductSearchText}
                           margin="normal"
                           label="🔍"
                           style={{width: 500, backgroundColor: '#f5fcff', borderRadius: 5, marginLeft: 10}}
                           size={"small"}
                           autoFocus>
                </TextField>
                <DataGrid
                    rowClick="show"
                    rows={products.filter(filterProducts(searchProductText))}
                    autoHeight={true}
                    columns={columns}
                    EnableHeadersVisualStyles={false}
                    getRowId={(row) => row.code}
                    style={{borderColor: "transparent"}}
                />
            </div>
            <div style={{
                flex: "0.5",
                marginRight: 10,
                backgroundColor: '#bde1d5',
                borderRadius: 5,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: "black"
            }}
            >
                <List>
                    {
                        cartProducts.map((product, id) => {
                            return (
                                <ListItem
                                    key={id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handlerDeleteProductCart(id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    }>

                                    <ListItemText
                                        primary={product.name + " . . . . . . . $" + product.price}
                                        secondary={product.category.name}
                                    />
                                </ListItem>

                            )
                        })
                    }
                    {
                        (
                            <ListItem key={"total"}>
                                <ListItemText
                                    primary={"Total = $" + cartProducts.map(p => p.price).reduce((preVal, curVal) => preVal + curVal, 0)}
                                />
                            </ListItem>
                        )
                    }
                </List>
                <Button variant="contained" disabled={cartProducts.length <= 0}
                        style={{marginLeft: 25, marginRight: 25, width: "90%"}}
                        onClick={handlerModalOpen}>
                    Comprar
                </Button>
                <Modal
                    open={addBuyModalVisible}
                    onClose={handlerModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{
                        flexDirection: 'column',
                        display: 'flex',
                        backgroundColor: '#ccdcd7',
                        borderRadius: 10,
                        height: "auto",
                        width: 1300,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid #000',
                        boxShadow: 100,
                    }}>

                        <div style={{
                            marginTop: 20,
                            marginRight: 20,
                            marginLeft: 20,
                            flexDirection: "row",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            backgroundColor: "#7c95a8"
                        }}>
                            <Typography>Método de pago</Typography>
                            <RadioGroup row onChange={handlePaymentMethodChange}>
                                <FormControlLabel value="CREDIT" control={<Radio/>} label="Tarjeta de crédito"/>
                                <FormControlLabel value="DEBIT" control={<Radio/>} label="Tarjeta de débito"/>
                                <FormControlLabel value="CASH" control={<Radio/>} label="Efectivo"/>
                                <FormControlLabel value="MERCADO_PAGO" control={<Radio/>} label="Mercado pago"/>
                            </RadioGroup>
                        </div>
                        <div>
                            {
                                (paymentMethod.method === "CREDIT" || paymentMethod.method === "DEBIT") && (
                                    <div style={{
                                        margin: 20,
                                        flexDirection: "row",
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#7c95a8"
                                    }}>
                                        <Typography style={{paddingLeft: 10}}>Entidad bancaria</Typography>
                                        <RadioGroup size="small" row onChange={handleEntityChange}>
                                            <FormControlLabel value="BBVA" control={<Radio/>} label="BBVA Frances"/>
                                            <FormControlLabel value="GALICIA" control={<Radio/>} label="Banco Galicia"/>
                                            <FormControlLabel value="SANTANDER" control={<Radio/>} label="Santander"/>
                                            <FormControlLabel value="MACRO" control={<Radio/>} label="Banco Macro"/>
                                            <FormControlLabel value="ITAU" control={<Radio/>} label="Banco Itau"/>
                                            <FormControlLabel value="NACION" control={<Radio/>} label="Banco Nación"/>
                                            <FormControlLabel value="CIUDAD" control={<Radio/>} label="Banco Ciudad"/>
                                            <FormControlLabel value="PROVINCIA" control={<Radio/>} label="Banco Provincia"/>
                                            <FormControlLabel value="SUPERVIELLE" control={<Radio/>}
                                                              label="Banco Supervielle"/>
                                            <FormControlLabel value="PATAGONIA" control={<Radio/>} label="Banco Patagonia"/>
                                            <FormControlLabel value="HSBC" control={<Radio/>} label="Banco HSBC"/>
                                            <FormControlLabel value="ICBC" control={<Radio/>} label="Banco ICBC"/>
                                        </RadioGroup>
                                    </div>
                                )}

                        </div>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            {
                                (cartProducts.length > 0) &&
                                (
                                    <List>
                                        {
                                            cartProducts.map((p, id) => {
                                                    return (
                                                        <ListItem key={id}>
                                                            <ListItemText
                                                                primary={p.name + " . . . . . . . . $" + p.price}
                                                                secondary={p.category.name}
                                                            />
                                                        </ListItem>

                                                    )
                                                }
                                            )
                                        }
                                        {
                                            (
                                                <ListItem key={"total"}>
                                                    <ListItemText
                                                        primary={"Total sin descuentos = $" + cartProducts.map(p => p.price).reduce((preVal, curVal) => preVal + curVal, 0)}
                                                    />
                                                </ListItem>
                                            )
                                        }
                                    </List>
                                )
                            }

                            {
                                (processedProducts.length > 0) &&
                                (
                                    <List>
                                        {
                                            processedProducts.map((pp, id) => {
                                                return (
                                                    <ListItem key={id}>
                                                        <ListItemText
                                                            primary={pp.product.name + " . . . . . . . . $" + pp.product.price}
                                                            secondary={"Descuento aplicado: $" + pp.discount.value}
                                                        />
                                                    </ListItem>

                                                )
                                            })
                                        }
                                        {
                                            (
                                                <ListItem key={"total"}>
                                                    <ListItemText
                                                        primary={"Total a pagar = $" + (cartProducts.map(p => p.price).reduce((preVal, curVal) => preVal + curVal, 0) - processedProducts.map(pp => pp.discount.value).reduce((preVal, curVal) => preVal + curVal, 0))}
                                                    />
                                                </ListItem>
                                            )
                                        }
                                    </List>


                                )
                            }
                        </div>
                        <div style={{flexDirection: "row", display: 'flex', justifyContent: "space-between"}}>
                            <Button variant="contained" color="success" onClick={() => {
                                alert("Compra efectuada");
                                handleModalBuy();
                            }}
                                    disabled={(cartProducts.length === 0)}
                                    style={{
                                        width: 400,
                                        margin: 20,
                                    }}>
                                Comprar
                            </Button>

                            <Button variant="contained" onClick={handlerModalClose}
                                    style={{
                                        width: 400,
                                        margin: 20,
                                        backgroundColor: "red"
                                    }}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}


export default HomeScreen;
