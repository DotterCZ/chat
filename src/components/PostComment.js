import axios from 'axios';
import React, {useState} from 'react';

const PostComment = (props) => {

    // const postComment = () => {

    //     const namePara = 'Siegfried';
    //     const showAtPara = '3';
    //     const commentPara = 'Komentář';
    //     const videoIdPara = '1';
        
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             name: namePara,
    //             showAt: showAtPara,
    //             comment: commentPara,
    //             videoId: videoIdPara
    //         })
    //     };
    //     fetch('http://admin.frantisekklima.cz/data/JSON/post.php?name=' + namePara + '&comment=' + commentPara + '&showAt=' + showAtPara + '&videoId=' + videoIdPara, requestOptions)
    //         // .then(console.log('POST METHOD'));

    // }

    const [comment, setComment] = useState('');

    function handleFormSubmit( event ) {
        event.preventDefault();

        if(!comment) {
            console.log('Empty comment');
        } else {
            let formData = new FormData();
            formData.append('name', props.name)
            formData.append('comment', comment)
            formData.append('videoId', props.videoId)
            formData.append('showAt', props.showAt)
            formData.append('author', props.name)
            formData.append('position', props.position)

            axios({
                method: 'post',
                url: 'https://admin.frantisekklima.cz/data/JSON/post.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                // console.log(response)
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
        }

        setComment('');
    }

    return (
        <div className="box-footer">
            <div className="input-group justify-content-center">
                <input type="text" name="message" id='commentInput' value={comment} onChange={e => setComment(e.target.value)} placeholder="Napsat komentář" className="form-control" />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-warning btn-flat" onClick={handleFormSubmit}>Odeslat</button>
                </span>
            </div>
        </div>
    )
}

export default PostComment;