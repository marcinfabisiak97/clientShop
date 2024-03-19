import React from 'react';

import {
    Heading,
    ListItem,
    StyledLink,
    Wrapper,
} from '../components/ui/termsStyles';

const Terms = (): JSX.Element => {
    return (
        <Wrapper>
            <Heading>
                Warunki korzystania ze strony sprzedającej artykuły kuchenne
            </Heading>
            <ol>
                <ListItem>
                    <strong>Akceptacja warunków:</strong> Korzystając z tej
                    strony internetowej, zgadzasz się na przestrzeganie i
                    akceptację wszystkich warunków korzystania, które są opisane
                    poniżej. JeśListItem nie zgadzasz się z którymkolwiek z tych
                    warunków, prosimy o zaprzestanie korzystania z naszej
                    strony.
                </ListItem>
                <ListItem>
                    <strong>Zakazane działania:</strong> Nie wolno Ci używać tej
                    strony w sposób niezgodny z prawem lub w sposób, który może
                    naruszać prawa innych osób. Zakazane jest również
                    umieszczanie na stronie treści obraźListItemwych,
                    nielegalnych, szkalujących, pornograficznych lub innych
                    treści, które mogą być uznane za nieodpowiednie.
                </ListItem>
                <ListItem>
                    <strong>Informacje osobiste:</strong> Podczas korzystania ze
                    strony możemy zbierać pewne informacje osobiste, takie jak
                    imię, adres e-mail, numer telefonu itp. Zobacz naszą{' '}
                    <a href="poListItemtyka_prywatnosci.html">
                        poListItemtykę prywatności
                    </a>
                    , aby dowiedzieć się więcej o tym, jak te informacje są
                    gromadzone, przechowywane i wykorzystywane.
                </ListItem>
                <ListItem>
                    <strong>Zamówienia i płatności:</strong> JeśListItem
                    zdecydujesz się złożyć zamówienie na naszej stronie,
                    będziesz musiał podać pewne informacje, takie jak adres
                    dostawy, dane płatności itp. Upewnij się, że podajesz
                    dokładne i aktualne informacje. W przypadku płatności
                    onListItemne, korzystamy z bezpiecznych metod płatności, ale
                    nie ponosimy odpowiedzialności za ewentualne problemy
                    związane z płatnościami.
                </ListItem>
                <ListItem>
                    <strong>Dostępność produktów:</strong> Staramy się
                    utrzymywać aktualność informacji na stronie dotyczących
                    dostępności produktów. Jednakże, nie możemy zagwarantować,
                    że wszystkie produkty będą zawsze dostępne. W przypadku, gdy
                    zamówiony przez Ciebie produkt nie jest dostępny,
                    skontaktujemy się z Tobą w celu zaproponowania alternatywy
                    lub zwrotu pieniędzy.
                </ListItem>
                <ListItem>
                    <strong>Reklamacje i zwroty:</strong> JeśListItem masz
                    jakiekolwiek problemy z zamówionym produktem, prosimy o
                    kontakt z naszym działem obsługi kListItementa. Postaramy
                    się jak najszybciej rozwiązać problem. W przypadku zwrotów,
                    obowiązują nasze zasady zwrotów, które są dostępne na
                    stronie.
                </ListItem>
                <ListItem>
                    <strong>Prawa autorskie:</strong> Wszystkie treści, zdjęcia,
                    grafiki i inne materiały na stronie są chronione prawem
                    autorskim. Nie wolno ich kopiować, reprodukować ani
                    wykorzystywać w celach komercyjnych bez naszej zgody.
                </ListItem>
                <ListItem>
                    <strong>Zmiany warunków:</strong> Zastrzegamy sobie prawo do
                    zmiany warunków korzystania w dowolnym momencie. Aktualne
                    warunki będą zawsze dostępne na naszej stronie.
                </ListItem>
            </ol>
            <p>
                Dziękujemy za zapoznanie się z naszymi warunkami korzystania.
                JeśListItem masz jakiekolwiek pytania, prosimy o kontakt z
                naszym działem obsługi kListItementa.
            </p>
            <StyledLink to="/">Wróć do sklepu</StyledLink>
        </Wrapper>
    );
};

export default Terms;
