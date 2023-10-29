import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Main from "@components/Main";
import Footer from "@components/Footer";
import LoginModal from "@components/LoginModal";
import { ModalProvider } from "@contexts/ModalContext";

export default function Layout() {
	return (
		<>
			<ModalProvider >
				<LoginModal />
				<Header />
				<Main>
					<Outlet />
				</Main>
				<Footer />
			</ModalProvider>
		</>
	);
}
