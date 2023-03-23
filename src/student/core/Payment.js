import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { processPayment, getmeToken, createOrder, isAuthenticatedS, signouts } from '../helper/index';
import DropIn from 'braintree-web-drop-in-react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../core/Loading';


const Payment = ({
    course,
    reload = undefined,
    setReload = f => f,
}) => {
    
    const [loading, setLoad] = useState(true);
    const [info, setInfo] = useState({
        success: false,
        clientToken: null,
        error: "",
        instance: {},
      });

    const userId = isAuthenticatedS() && isAuthenticatedS().user.id;
    const token = isAuthenticatedS() && isAuthenticatedS().token;

      const history = useHistory();

    const getToken = (userId,token) => {
        getmeToken(userId, token)
        .then(info => {
            if (info.error) {
                setInfo({
                    ...info,
                    error: info.error
                })
                signouts(() => {
                    return <Redirect to="/student" />;
                })
            } else {
                const clientToken = info.clientToken;
                setInfo({ clientToken });
                setLoad(false);
            }
        })
    }

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getAmount = () => {
        let amount = course.price;
        return amount;
    } 

    const onPurchase = () => {
        setInfo({loading: true});
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then(data=>{
            console.log("MYDATA", data);
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response=>{
                console.log("POINT-1", response)
                if (response.error) {
                    if (response.code == '1') {
                        console.log("PAYMENT FAILED")
                        signouts(() => {
                            return <Redirect to="/student" />
                        })
                    }
                } else {
                    setInfo({...info,
                        success: response.success,
                        loading: false
                    })
                    console.log("PAYMENT SUCCESS")
                    const orderData = {
                        course: course.id,
                        transaction_id : response.transaction.id,
                        amount: response.transaction.amount
                    }
                    createOrder(userId, token, orderData)
                    .then(response=>{
                        if (response.error) {
                            if (response.code == '1') {
                                console.log("ORDER FAILED")
                            }
                            signouts(() => {
                                return <Redirect to="/student" />
                            })
                        } else {
                            if (response.success == true) {
                                console.log("ORDER PLACED")
                                history.push("/student/enrollment")
                                toast.success("You have successfully purchased Course!!!", {
                                    position: toast.POSITION.TOP_RIGHT
                                  });
                            }
                        }
                    })
                    .catch(e => {
                        setInfo({loading: false, success: false})
                        console.log("ORDER FAILED", e)
                    })
                    setReload(!reload)
                }
            })
            .catch(e=>console.log(e))
        })
        .catch(e=>console.log("NONCE", e))
    } 
    const loadingMess = () => {
        return(
            loading && (
                <Loading />
            )
        );
      }
    const showbtnDropIn = () => {
        return (
            <div className="container">
                {
                    info.clientToken !== null ? 
                    (
                        <div>
                            <DropIn
                                options={{ authorization: info.clientToken }}
                                onInstance={(instance) => (info.instance = instance)}
                             />
                                <button className="btn btn-block btn-success" onClick={onPurchase}>Buy now</button>
                        </div>
                    ) : 
                    (
                        <h3></h3>
                    )
                }
            </div>
        )
    }

    return (
        loading ? loadingMess() : 
        <div>
        <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Cancel" onClick={() => {history.push('/student/course')}}><i className="fas fa-close" /></button>
        <div className="popular page_section">
            <br/><br/> 
            {showbtnDropIn()}
        </div>
        </div>
    );
}

export default withRouter(Payment);