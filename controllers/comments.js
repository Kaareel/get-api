const path = require('node:path')
const fs = require('node:fs/promises')

const commentsFilePath = path.join(__dirname, '../data/comments.json')

const getAllComments = async (req, res) => {
    
    try {

        const data = await fs.readFile(commentsFilePath, { encoding: 'utf8' });
        const comments = JSON.parse(data);

        const postId = Number.parseInt(req.params.postId);
        console.log("id", postId);
        if (postId) {
            const comment = comments.filter(c => c.postId === postId);
            return res.json(comment);
        }
            return res.json(comments);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading comments file' });
    }
}

const postComment = async(req, res) => {
    try {
        const { postId, comment } = req.body;
        if (!postId || !comment){
            return res.status(400).json({ error: 'postId and comment are required' });
        }
        const data = await fs.readFile(commentsFilePath, { encoding: 'utf8' });
        const comments = JSON.parse(data);

        const lastComment = comments[comments.length - 1];
        const newCommentId = lastComment ? lastComment.id + 1 : 1;

        const newComment = { id: newCommentId, postId, comment };

        comments.push(newComment);
        await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2));

        res.status(201).json(newComment);

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving comment' });
    }
}

const putComment = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const data = await fs.readFile(commentsFilePath, { encoding: 'utf8' });
            const comments = JSON.parse(data);

            const commentIndex = comments.findIndex(c => c.id === Number(id));
            
            if (commentIndex === -1) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            const { comment } = req.body;

            comments[commentIndex].comment = comment;

            await fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2));
            
            res.json(comments[commentIndex]);
        } else {
            return res.status(400).json({ error: 'Comment ID is required' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating comment' });
    }
}

const deleteComment = async (req, res) => {
    const commentId = Number.parseInt(req.params.id);
    console.log("id", commentId);
    try {

        if (!commentId) {
            return res.status(400).json({ error: 'Comment ID is required' });
        }
        const data = await fs.readFile(commentsFilePath, 'utf8')
        const comments = JSON.parse(data)
        const updatedComments = comments.filter(c => c.id!== commentId)
        res.json(updatedComments)

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting comment' })
    }
}
    module.exports = {getAllComments, postComment, putComment, deleteComment}