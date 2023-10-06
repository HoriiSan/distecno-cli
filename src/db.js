import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://Hori:Usseewa.01@cluster0.5rymh4d.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
        );
        console.log('>>> Data base is connected');
    } catch (error) {
        console.log(error);
    }
};
