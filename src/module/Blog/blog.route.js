import e from 'express';
import * as blog from './blog.controller.js'

const blogRouter=e.Router();

blogRouter.post('/add',blog.addBlog);
blogRouter.put('/update/:id',blog.updateBlog);
blogRouter.post('/like/:id',blog.likeBlog);
blogRouter.post('/comment/:id',blog.commentBlog);

export default blogRouter;