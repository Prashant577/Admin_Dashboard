const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require('stripe')('sk_test_51NlEeASHWDOnEoxGUHMNcdhF02MuqZ1Kzk16QyNQaiN3ZIg0A4ZKn0IoZcsRbadBVFHNJoSlVqVO5DpY5S99v23p0072Xf77m7')

const renderBuyPage = async(req,res)=>{

    try {
        
        res.render('buy', {
            key: 'pk_test_51NlEeASHWDOnEoxGXGDBjTio4gb8a13p62dVPI7C5rwstAzCRuLLjyQDEcjWutSB59xjIPOuQjXSWNI7PW5H4ooj00TOCjgk1z',
            amount:250
         })

    } catch (error) {
        console.log(error.message);
    }

}

const payment = async(req,res)=>{

    try {

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Prasanat Kumar',
        
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: req.body.amount,     // amount will be amount*100
            description: req.body.productName,
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.redirect("/failure")
    })
    .catch((err) => {
        res.redirect("/success")
    });


    } catch (error) {
        console.log(error.message);
    }

}

const success = async(req,res)=>{

    try {
        
        res.render('success');

    } catch (error) {
        console.log(error.message);
    }

}

const failure = async(req,res)=>{

    try {
        
        res.render('failure');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    renderBuyPage,
    payment,
    success,
    failure
}