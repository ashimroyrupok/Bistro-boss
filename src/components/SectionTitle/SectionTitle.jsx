
const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="md:w-4/12 text-center mx-auto">
            <p className="text-orange-600 my-7"> {subHeading} </p>
            <h2 className="text-3xl font-semibold border-y-4 my-5 text-black">{heading}</h2>
            
        </div>
    );
};

export default SectionTitle;