const expressAsyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.find({user_id: req.user.id})
    res.status(200).json(contact)
})

// @desc Get all contacts
// @route GET /api/contacts/:id
// @access private
const getContact = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
})

// @desc POST all contacts
// @route POST /api/contacts
// @access private
const postContacts = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory!!")
    }
    const contact = await Contact.create({name,email,phone,
    user_id: req.user.id})
    res.status(200).json({contact})
})

// @desc update contacts
// @route PUT /api/contacts/:id
// @access private
const putContacts = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error("You don't have permission to update other user contacts")
    }
    const updatedContacts = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );   

    res.status(200).json(updatedContacts)
})

// @desc DELETE all contacts
// @route GET /api/contacts/:id
// @access private
const deleteContacts = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("You don't have permission to delete other user contacts")
    }
    const deleteContact = await Contact.findByIdAndDelete(req.params.id)

    res.status(200).json(deleteContact)
})

module.exports = { getContacts, getContact, postContacts, putContacts, deleteContacts };