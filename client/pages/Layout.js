import TopNav from '../Components/TopNav'
 
export default function Layout({ children }) {
  console.log("The children prop is: ", children);
  return (
    <>

      <main>{children}</main>

    
    
    </>
  )
}