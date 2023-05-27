const Joi = require("joi");

module.exports = {
    addUserSchema : {
            body:Joi.object().required().keys({
                firstName:Joi.string().required(),
                lastName:Joi.string().required(),
                age:Joi.number().required(),
                email:Joi.string().required().email(),
                password:Joi.string().required().regex(/(?=.*\d)(?=.*[a-zA-z])(\w+){8,}/),
            
            })
    },
    signInSchema:{
        body:Joi.object().required().keys({
            
            email:Joi.string().required().email(),
            password:Joi.string().required().regex(/(?=.*\d)(?=.*[a-zA-z])(\w+){8,}/),
        })
    }


} 