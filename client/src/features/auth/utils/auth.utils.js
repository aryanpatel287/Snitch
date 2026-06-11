export function redirectUserAfterAuth({ role, navigate }) {
    switch (role) {
        case 'seller':
            navigate('/profile?tab=home');
            break;
        default:
            navigate('/');
            break;
    }
}
