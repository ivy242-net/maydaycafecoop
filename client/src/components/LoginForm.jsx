import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function LoginForm({ label }) {

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authData = await pb.collection('users').authWithPassword(
                'editor@ivy242.net',
                password,
            );
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div>{error}</div>}
            <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset class="fieldset">
                    <label class="fieldset-label">Password</label>
                    <input type="password" class="input w-full" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button type="submit" class="btn btn-neutral mt-4">Submit</button>
                </fieldset>
            </form>
        </>
    )
}

export default LoginForm;