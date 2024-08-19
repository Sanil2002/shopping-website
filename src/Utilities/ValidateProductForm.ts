export const validateProductForm = (product: {
    id:number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}) => {
    const trimmedTitle = product.title.trim();
    const trimmedDescription = product.description.trim();
    const trimmedImage = product.image.trim();
    const trimmedCategory = product.category.trim();

    if (!trimmedTitle) {
        alert("Title cannot be empty or just spaces.");
        return false;
    }

    if (!trimmedDescription) {
        alert("Description cannot be empty or just spaces.");
        return false;
    }

    if (!trimmedImage) {
        alert("Image URL cannot be empty or just spaces.");
        return false;
    }

    if (!trimmedCategory) {
        alert("Category cannot be empty or just spaces.");
        return false;
    }


    if (product.price <= 0) {
        alert("Price must be a positive number.");
        return false;
    }

    if (product.id <= 0) {
        alert("id must be a positive number.");
        return false;
    }

    return true;                                               //If all the validation passes.
};
