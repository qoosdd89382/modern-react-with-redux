import { useSelector, useDispatch } from "react-redux";
import { removeCar } from '../store'

function CarList() {
    // // 在 carsSlice state.cars 裡叫做 data, 重新命名為 cars
    // const { data: cars, searchTerm } = useSelector(state => state.cars);

    const { cars, inputName } = useSelector(({ form, cars: { data, searchTerm }}) => {
        const filteredCars = data.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return {
            cars: filteredCars,
            inputName: form.name
        }
    })
    const dispatch = useDispatch();

    const handleCarDelete = (carId) => {
        dispatch(removeCar(carId))
    };

    const renderedCars = cars.map(car => {
        const bold = inputName && car.name.toLowerCase().includes(inputName.toLowerCase());
        return (
            <div 
                className={`panel ${bold && 'bold'}`}
                key={car.id}
            >
                <p>
                    {car.name} - ${car.cost}
                </p>
                <button
                    className="button is-danger"
                    onClick={() => handleCarDelete(car.id)}
                >
                    Delete
                </button>
            </div>
        );
    });

    return (
        <div className="car-list">
            {renderedCars}
        </div>
    );
}

export default CarList;