# Mobile Flash Cards

The
[Udacity React Nanodegree Course](https://www.udacity.com/course/react-nanodegree--nd019),
[React Native](https://facebook.github.io/react-native/)
assignment code is contained in this repository.

The application was tested on the Android Emulator.

To run the application:

  - clone or download the repository
  - start the Android Emulator
  - in the repository directory execute at the command line
    - `yarn` to install all dependencies,
    - `yarn start android` to run the application

### License

MIT Licensed

## File Naming Convention - Rant
In a react application I use hyphenated filenames for the reasons provided below.

### NPM
React is based on node and npm and npm prefers hyphens.
You can verify this by entering the following at a Linux command line.
```sh
mkdir MyApp
cd MyApp
npm init
```
npm automatically changes the package name to lowercase and if you try changing
it back, you get the following error message.
```sh
package name: (myapp) MyApp
Sorry, name can no longer contain capital letters.
```
To be consistent from npm to React projects I use filenames with hyphens.

### Filesystem
Filenames like myapp, myApp and MyApp are problematic on Windows and Macs
due to case insensitive filesystems and can collide to the same filename.
Using lowercase with hyphens, such as my-app, will not have the collusion
issue on Linux, Macs or Windows.

### Flexibility
When working on personal projects I use hyphenated filenames and on
collaborative projects I will use the convention used for the project.

### Hard and Soft Conventions
NPM and case insensitive file systems are conventions that are enforced by the
package manager and the file system and I call that a hard convention.
React uses camelcase by convention so that the class name and filename match.
Not using that convention does not cause any issues with the React tool chains,
so I call that a soft convention.

### Conclusion
I have chosen a hyphenated file naming convention for:
  - consistency from npm to react, and
  - in order to avoid the filename collision problem on case insensitive filesystems.


# Ignore scratch pad below.
