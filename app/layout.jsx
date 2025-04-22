import './styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>GPA Calculator</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}