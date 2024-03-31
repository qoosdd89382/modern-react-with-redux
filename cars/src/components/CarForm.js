import { useSelector, useDispatch } from "react-redux";
import { 
    changeName, changeCost,
    addCar, 
} from '../store'

function CarForm() {
    const { name, cost } = useSelector(state => state.form);
    const dispatch = useDispatch();

    const handleChangeName = (event) => {
        dispatch(
            changeName(event.target.value));
    }
    const handleCostName = (event) => {
        const carCost = parseInt(event.target.value) || 0;
        dispatch(
            changeCost(carCost));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            addCar({ name, cost }));
    }

    return (
        <div className="car-form panel">
            <h4 className="subtitle is-3">Add Car</h4>
            <form onSubmit={handleSubmit}>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Name</label>
                        <input 
                            className="input is-expanded"
                            value={name}
                            onChange={handleChangeName}
                        />
                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Cost</label>
                        <input 
                            className="input is-expanded"
                            value={cost || ''}
                            onChange={handleCostName}
                            type="number"
                        />
                    </div>
                </div>
                <div className="field">
                    <button className="button is-link">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CarForm;