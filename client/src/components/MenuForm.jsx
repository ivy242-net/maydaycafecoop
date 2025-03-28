import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function MenuForm({ label }) {
    const [menuType, setMenuType] = useState('kitchen');
    const [isVegan, setIsVegan] = useState('');
    const [isGlutenFree, setIsGlutenFree] = useState('');
    const [menuContent, setMenuContent] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(menuType)
            console.log(menuContent)
            console.log(isVegan)
            console.log(isGlutenFree)

            const menuData = await pb.collection('specials').create({
                "type": menuType,
                "content": menuContent,
                "is_vegan": isVegan,
                "is_glutenfree": isGlutenFree, 
                "author": '1'
            })

            console.log('menudata ', menuData)

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset class="fieldset">
                    <label class="fieldset-label">What kind of special is it?</label>
                    <select name="menu-type" class="select" id="menu-type-select" required onChange={(e) => setMenuType(e.target.value)}>
                        <option value="kitchen">Kitchen</option>
                        <option value="bakery">Bakery</option>
                        <option value="drinks">Drink</option>
                    </select>
                    <fieldset class="fieldset">
                        <input type="checkbox" id="vegan-checkbox" class="checkbox" name="vegan-checkbox" onChange={(e) => setIsVegan(e.srcElement.checked)} />
                        <label for="vegan-checkbox" class="fieldset-label">Vegan?</label>

                        <input type="checkbox" id="glutenfree-checkbox" class="checkbox" name="glutenfree-checkbox" onChange={(e) => { setIsGlutenFree(e.srcElement.checked)}} />
                        <label for="glutenfree-checkbox" class="fieldset-label">Gluten Free?</label>
                    </fieldset>

                    <label class="fieldset-label">What's the special?</label>
                    <textarea placeholder="Type here" class="textarea" required onChange={(e) => setMenuContent(e.target.value)} />
                    <button type="submit" class="btn btn-neutral mt-4">Submit</button>
                </fieldset>
            </form>
        </>
    )
}

export default MenuForm;