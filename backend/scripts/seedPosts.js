// import mongoose from 'mongoose';
// import { Post } from "../src/models/post.model.js";// Update with the correct path to your Post model
// const ownerIds = [
//     "6660cbee176d8eca61760289", "668388b37f5e8e1f85f75c55", "668389131079577e9df68033",
//     "66838d95ffc047be3a804c86", "668399f578e3ca991aec8f7b", "6683a4fd2fe8d86999c84acd",
//     "6686201c7da76c14cfcc3670"
// ];

// const categoryIds = [
//     "668b994197f1db3456f537a2", "668b994197f1db3456f537a4", "668b994197f1db3456f53799",
//     "668b994197f1db3456f53797", "668b994197f1db3456f5379c", "668b994197f1db3456f5379a",
//     "668b994197f1db3456f53798", "668b994197f1db3456f5379d", "668b994197f1db3456f537a3",
//     "668b994197f1db3456f5379b", "668b994197f1db3456f5379e", "668b994197f1db3456f537a0",
//     "668b994197f1db3456f537a1", "668b994197f1db3456f53796", "668b994197f1db3456f5379f"
// ];
// const numberOfPosts = 100;

// // Generate a random post
// const generateRandomPost = () => {
//     const ownerId = ownerIds[Math.floor(Math.random() * ownerIds.length)];
//     const categoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
//     const title = `Post Title ${Math.floor(Math.random() * 1000)}`;
//     const description = `Description for ${title}`;
//     return {
//         title,
//         description,
//         owner: ownerId,
//         category: categoryId
//     };
// };

// // Connect to MongoDB and insert posts
// mongoose.connect('mongodb+srv://msachdeva9april:Mayank1234@cluster0.humvsb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(async () => {
//         console.log('Connected to MongoDB');
//         const posts = Array.from({ length: numberOfPosts }, generateRandomPost);
//         await Post.insertMany(posts);
//         console.log(`${numberOfPosts} posts inserted successfully`);
//         mongoose.connection.close();
//     })
//     .catch(err => {
//         console.error('Error connecting to MongoDB or inserting posts:', err);
//         mongoose.connection.close();
//     });
import mongoose from 'mongoose';
import { Post } from "../src/models/post.model.js"; // Update with the correct path to your Post model

const ownerIds = ["668389131079577e9df68033", "66838d95ffc047be3a804c86"]

// Connect to MongoDB and delete posts
mongoose.connect('mongodb+srv://msachdeva9april:Mayank1234@cluster0.humvsb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        const deleteResult = await Post.deleteMany({
            owner: { $in: ownerIds }
        });

        console.log(`${deleteResult.deletedCount} posts deleted successfully`);
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB or deleting posts:', err);
        mongoose.connection.close();
    });

