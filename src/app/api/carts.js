import {
    returnOrThrow,
    getWrapper,
    CARTS,
    WISHLIST,
} from "./util";

export const cartdetailsDetails = async (id) => {
    const resJSON = await getWrapper(`${CARTS}/${id}`);
    const result = await returnOrThrow(resJSON);
    return result;
};

export const wishlistDetails = async (id) => {
    const resJSON = await getWrapper(`${WISHLIST}/${id}`);
    const result = await returnOrThrow(resJSON);
    return result;
};
