import Head from 'next/head'
import Layout from '../../comps/Layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../comps/date'
import React, { useState, useEffect } from 'react';
import db from '../api/firebase'
import firebase from 'firebase';
import { set } from 'date-fns';




export default function Post({ postData }) {


    const [comment, setComment] = useState([])
    const [input, setInput] = useState('')



    const [ID, setID] = useState([])


    // // the db connection
    // useEffect(() => {


    //     db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {

    //         // setComment(snapshot.docs.map(doc => doc.data().comment))
    //         // setID(snapshot.docs.map(doc => doc.data().id))


    //         // setPost(snapshot.docs.map(doc => doc.data()));


    //         // console.log('run mess')


    //         // // console.log((snapshot.docs.map(doc => doc.data().id)))
    //         // console.log((snapshot.docs.map(doc => doc.data().comment)))




    //     })


    //     return () => console.log('cleanups')

    // }, []);



    useEffect(async () => {

        // console.log('>>>>',postData.id)
        fetchComments();


    }, [])



    const fetchComments = async () => {


        const postRef = db.collection('posts');
        const snapshot = await postRef.where('id', '==', postData.id).get();

        // const snapshot = await postRef.where('id', 'array-contains', postData.id).get();


        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        console.log('snapshot=>', snapshot)

        let dog = []

        snapshot.forEach(doc => {
            // console.log(doc.comment, '=>', doc.data());

            dog.push(doc.data())
            // setComment([...comment, doc.data()])

            console.log('new =>', doc.data());
        });

        setComment(dog)

    }



    //Addd comments
    const handleComment = (e, id, input) => {
        e.preventDefault();


        db.collection('posts').add({
            id: id,
            comment: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('')
        fetchComments();
    }


    // console.log('hahaha', comment)

    return (
        <Layout>

            <Head>
                <title>{postData.title}</title>
            </Head>

            {postData.title}
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />



            <form className='comments'>
                <input placeholder='Add comments..' value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={(e) => handleComment(e, postData.id, input)}> submit comment </button>
            </form>




            <div>
                {comment.map(cmnts => {
                    return <div>{cmnts.comment}</div>
                })}
            </div>







            {/* 1- The button is clicked */}
            {/* 2- The data is saved in the DB */}
            {/* 3 - THe liked amount comes and displays next to it */}
        </Layout>



    )
}





export async function getStaticPaths() {

    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
}



export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}



