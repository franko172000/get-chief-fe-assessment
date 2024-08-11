const LogoutIcon = ({className}: {className: string}) => {
    return (
        <span className={className}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                 stroke="currentColor">
                <path
                    d="M3.75 17.5C3.41667 17.5 3.125 17.375 2.875 17.125C2.625 16.875 2.5 16.5833 2.5 16.25V3.75C2.5 3.41667 2.625 3.125 2.875 2.875C3.125 2.625 3.41667 2.5 3.75 2.5H9.8125V3.75H3.75V16.25H9.8125V17.5H3.75ZM13.875 13.6458L12.9792 12.75L15.1042 10.625H7.8125V9.375H15.0625L12.9375 7.25L13.8333 6.35417L17.5 10.0208L13.875 13.6458Z"
                    fill="#53545C"/>
            </svg>
        </span>
    )
}
export default LogoutIcon;