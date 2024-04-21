import React from 'react'
import { useMemo } from 'react';
import { Date2Time } from '../functions/utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { get_user_details_api } from '@func/api_functions';

export default function useHelper(item) {

    const orderTime = useMemo(() => Date2Time(item?.orders?.timestamps?.placedAt), [item])

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            const [data, error] = await get_user_details_api(item?.user_id, item?.orders?.address_id);
            setUser(data);
        };
        fetchUserDetails();
    }, [item]);

    return {
        user,
        orderTime
    }
}


