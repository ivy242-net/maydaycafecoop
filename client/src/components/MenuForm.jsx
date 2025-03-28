import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function MenuForm({ label }) {
    const [menuType, setMenuType] = useState('kitchen');
    const [isVegan, setIsVegan] = useState('');
    const [isGlutenFree, setIsGlutenFree] = useState('');
    const [menuContent, setMenuContent] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(image)
        try {
            let dataToSend = {
                "type": menuType,
                "content": menuContent,
                "is_vegan": isVegan,
                "is_glutenfree": isGlutenFree,
                "media": image
            }

            // Make sure we can get the user data before trying to send it
            if (pb.authStore?.model?.id) {
                dataToSend['author'] = pb.authStore.model.id
            }

            const menuData = await pb.collection('specials').create(dataToSend)

            // Success needs to looks like success, for now, we can redirect to the homepage because the menu will be there
            window.location.href = '/';

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">What kind of special is it?</legend>
                    <select name="menu-type" class="select" id="menu-type-select" required onChange={(e) => setMenuType(e.target.value)}>
                        <option value="kitchen">Kitchen</option>
                        <option value="bakery">Bakery</option>
                        <option value="drinks">Drink</option>
                    </select>
                </fieldset>

                <fieldset class="fieldset bg-base-100 border border-base-300 rounded-box w-64">
                    <legend class="fieldset-legend">Dietary Restrictions</legend>
                    <label class="fieldset-label">
                        <input type="checkbox" id="vegan-checkbox" class="checkbox" name="vegan-checkbox" onChange={(e) => setIsVegan(e.srcElement.checked)} />
                        Vegan?
                        <input type="checkbox" id="glutenfree-checkbox" class="checkbox" name="glutenfree-checkbox" onChange={(e) => { setIsGlutenFree(e.srcElement.checked)}} />
                        Gluten Free?
                    </label>
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">What's the special?</legend>
                    <textarea class="textarea h-24" placeholder="A little description about your special" required onChange={(e) => setMenuContent(e.target.value)}></textarea>
                    <div class="fieldset-label">Required</div>
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Upload an image of your special</legend>
                    <input type="file" class="file-input" onChange={(e) => setImage(e.target.files[0]) } />
                    <label for="media" class="fieldset-label">Max size 5MB</label>
                </fieldset>

                <button type="submit" class="btn btn-neutral mt-4">Submit</button>
            </form>
        </>
    )
}

export default MenuForm;