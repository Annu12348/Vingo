import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { allItemPublic, singleShopFetchAllItem } from '../api/item';
import { setItemPublic } from '../redux/reducer/ItemReducer';

// Custom hook to fetch all public items
export const useAllItem = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllItemPublic = async () => {
            try {
                const result = await allItemPublic();
                dispatch(setItemPublic(result.data.data));
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllItemPublic();
    }, [dispatch]);
};

// Custom hook to fetch all items for a single shop by shop ID
export const useSingleShopAllItem = (detailsId) => {
    const [ shopData, setShopData ] = useState({})
    const [ foodItem, setFoodItem ] = useState([])
    
    useEffect(() => {
        const fetchSingleShopAllItem = async () => {
            if (!detailsId) return;
            try {
                const res = await singleShopFetchAllItem(detailsId);
                setShopData(res.data.data.shop)
                setFoodItem(res.data.data.items)
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleShopAllItem();
    }, [detailsId]);

    return { shopData, foodItem }
};
