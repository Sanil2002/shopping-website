export const validateForm = (product: {
    id:number;
    title: string;
    price: number;
    description: string;
    image: string | File | null;
    category: string;
}) => {
    const trimmedTitle = product.title.trim();
    const trimmedDescription = product.description.trim();
    const trimmedCategory = product.category.trim();

    if (!trimmedTitle) {
        alert("Title cannot be empty or just spaces.");
        return false;
    }

    if (!trimmedDescription) {
        alert("Description cannot be empty or just spaces.");
        return false;
    }

    if (typeof product.image === 'string') {                      //if image is in the form of URL
        const trimmedImage = product.image.trim();
        if(!trimmedImage){
            alert("Image URL cannot be empty or just spaces.");
            return false;
        }
    } else if(product.image instanceof File) {                   //if image is in the form of File.
        if(!product.image){
            alert("Please select an image file.");
            return false;
        }
        const validTypes = ['image/jpeg','image/png','image/gif'];
        if(!validTypes.includes(product.image.type)){
            alert("Please select a valid image file (jpeg,png,gif).");
            return false;
        }

    } else {
        alert("Invalid image format.");
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
