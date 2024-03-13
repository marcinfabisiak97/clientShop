import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { StyledLink, Wrapper } from '../../components/ui/userStyles';
import { useAppSelector } from '../../redux/store';
import { formatCreatedAt } from '../../Utils';

const User: React.FC = () => {
    const user = useAppSelector((state) => {
        return state.user.currentUser?.others;
    });

    return (
        <>
            {user !== null && user !== undefined ? (
                <Wrapper>
                    <StyledLink to="/userupdate">Edytuj</StyledLink>
                    <h2></h2>
                    <h3>User ID: {user._id}</h3>
                    <p>Username: {user.username}</p>
                    <p>First Name: {user.firstname}</p>
                    <p>Last Name: {user.lastname}</p>
                    <p>Hasło: {user.password}</p>
                    <p>Email: {user.email}</p>
                    <p>Created At: {formatCreatedAt(user.createdAt ?? '')}</p>
                    <p>
                        Updated At: {formatCreatedAt(user.updatedAt ?? '')}
                    </p>{' '}
                    <StyledLink to="/">wróć</StyledLink>
                </Wrapper>
            ) : (
                <Wrapper>
                    <SkeletonTheme baseColor="#f5fbfd" highlightColor="#037878">
                        <Skeleton circle height={200} width={200} />
                    </SkeletonTheme>
                </Wrapper>
            )}{' '}
        </>
    );
};

export default User;
