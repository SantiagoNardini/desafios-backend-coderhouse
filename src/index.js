import mongoose from 'mongoose';
import orderModel from './models/order.js';

const environment = async() =>{
    await mongoose.connect('mongodb+srv://CoderUser:<password>@codercluster.8baqy0g.mongodb.net/?retryWrites=true&w=majority')
    let result = await orderModel.aggregate([
    {
        $match: { size: 'medium'}
    },
    {
        $group: {_id: '$name', total: { $sum: '$quantity'}}
    },
    {
        $sort: { total: '-1'}
    },
    {
        $group: {_id: 'Nuevo', orders: { $push: '$$ROOT'}}
    },
    {
        $project: {_id: 0, orders: '$orders'}
    },
    {
        $merge: { into: 'reports'}
    }
]);
    console.log(result)
}

environment()