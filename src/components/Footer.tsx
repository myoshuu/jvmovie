const Footer = () => {
  return (
    <div className="mt-20 flex flex-col justify-center items-center bg-secondary w-full px-36 py-10">
      <div className="text-white  flex gap-x-10">
        <div>
          <h1 className="text-xl font-semibold">JV Cinema</h1>
          <p className="mt-3 text-sm">
            in Salatiga, <br /> Central Java Indonesia
          </p>
        </div>
        <div className="border-l border-gray"></div>
        <div>
          <p>
            Made with &hearts; <br /> Using mantine, tailwindcss and iconify
          </p>
          <br />
          <p>TMDB API</p>
          <p className="text-gray text-sm">
            Copyright &copy; Joe, All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
