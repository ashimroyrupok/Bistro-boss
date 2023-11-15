
const FoodCard = ({ item }) => {

    const { name, recipe, image, category, price } = item

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl bg-slate-50">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body flex flex-col items-center justify-center">
                <h2 className="card-title"> {name} </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions ">
                    <button className="btn btn-outline border-b-4">Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;