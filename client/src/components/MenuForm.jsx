import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function MenuForm({ label }) {
    const [menuType, setMenuType] = useState('kitchen');
    const [menuContent, setMenuContent] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(menuType)
            console.log(menuContent)
            console.log(date)
            console.log(pb.authStore)

            const menuData = await pb.collection('menus').create({
                "type": menuType,
                "content": menuContent,
                "date": date,
                "author": '1'
            })

            console.log(menuData)
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset class="fieldset">
                    <label class="fieldset-label">Kitchen or Bakery?</label>
                    <select name="menu-type" class="select" id="menu-type-select" required onChange={(e) => setMenuType(e.target.value)}>
                        <option value="kitchen">Kitchen</option>
                        <option value="bakery">Bakery</option>
                    </select>
                    <label class="fieldset-label">What's the Menu?</label>
                    <textarea placeholder="Type here" class="textarea" required onChange={(e) => setMenuContent(e.target.value)} />
                    <label class="fieldset-label">What day is it for?</label>
                    <input type="date" class="input" required onChange={(e) => setDate(e.target.value)}/>
                    <button type="submit" class="btn btn-neutral mt-4">Submit</button>
                </fieldset>
            </form>
        </>
    )
}

export default MenuForm;