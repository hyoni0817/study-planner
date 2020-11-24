import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import '../public/css/style.css';

//redex
import wrapper from '../store/configureStore';

const StudyPlanner = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>Study Planner</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.7.2/antd.min.css" />
            </Head>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </>
    )
}

StudyPlanner.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(StudyPlanner);