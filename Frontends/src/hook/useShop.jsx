import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setPublicShop } from '../redux/reducer/ShopReducer';
import { allShopReadPublic } from '../api/shop';

export const useAllShop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const allShopReadPublicApi = async () => {
            try {
                const result = await allShopReadPublic();
                dispatch(setPublicShop(result.data.data));
            } catch (error) {
                console.error(error);
            }
        };
        allShopReadPublicApi();
    }, [dispatch]);
};

