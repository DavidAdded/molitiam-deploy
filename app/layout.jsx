import '@styles/globals.css';

export const metadata = {
    title: "crgroup",
    description: "military things"
}

const RootLayout = ({children}) => {
  return (
    <html>
        <body>
            <div className='main'>
                <div className='gradient'>

                </div>
                <main className='app'>
                {children}
                </main>

            </div>
        </body>
    </html>
 
  )
}

export default RootLayout;
