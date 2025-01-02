import {Blog} from '../../../dbconnection/entity/blog.entity.js'

const addBlog=async(req,res)=>{
const {title,content,tags,imageUrl}=req.body;
    try {
        const newBlog= await Blog.create({
            title,
            content,
            tags,
            imageUrl
        });
        res.status(201).json({message:"blog is posted successfully"},newBlog);
        
    } catch (error) {
        res.status(500).json({message:'Internal Server error'},error)
        
    }
}

const updateBlog=async(req,res)=>{
    const {id}=req.params;
   const {title,content,tags,imageUrl}=req.body;

   try {
    const blog=await Blog.findByPk({id});
    if(!blog){
        return res.status(404).json({message:"blog post is not found"})
    }
    blog.title=title || blog.title;
    blog.content=content || blog.content;
    blog.tags=tags || blog.tags;
    blog.imageUrl =imageUrl|| blog.imageUrl;

    await blog.save();
    res.status(200).json({message:"blog is updated successfully"});
   } catch (error) {
    
    res.status(500).json({message:"internal server error"});
   }

}

const likeBlog=async(req,res)=>{
    const {id}=req.params;
   try {
    const blog=await Blog.findByPk(id);
    if(!blog){
        return res.status(404).json({message:"blog post not found"});
    }
    blog.like+=1;
    await blog.save();
    res.status(200).json({message:"blog post liked successfully"});
   } catch (error) {
    res.status(500).json({message:"internal Server error"},error);
   }


}

const commentBlog=async(req,res)=>{
    const {id}=req.params;
    const {comment}=req.body;
    try {
        const blog=await Blog.findByPk(id);
        if(!blog){
            return res.status(404).json({message:"blog post not found"});
        }
        const newComment=await Comment.create({
            blogId:id,
            content,
            auther:req.user.id,  

        });


        res.status(201).json({message:'Comment added successfully'},newComment)
    } catch (error) {
        res.status(500).json({message:'internal server error'});
        
    }
}
export {addBlog,updateBlog,likeBlog,commentBlog};