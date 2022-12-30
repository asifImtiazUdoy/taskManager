import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useCurrentURL = () => {
    const location = useLocation();
    const [url, setUrl] = useState(location.pathname);
    
    useEffect(() => {
        setUrl(location.pathname);
    },[location.pathname])

    return [url];
};

export default useCurrentURL;