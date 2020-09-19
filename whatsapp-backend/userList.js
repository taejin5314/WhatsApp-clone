import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    name: String,
});

export default mongoose.model('userList', whatsappSchema);