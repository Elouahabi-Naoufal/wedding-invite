<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <h3 align="center">Wedding Invitation</h3>

  <p align="center">
    An animated, right-to-left Arabic wedding invitation with an online RSVP form and a small
    admin dashboard for guest responses.
    <br />
    <a href="https://github.com/Elouahabi-Naoufal/wedding-invite"><strong>Explore the source »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Elouahabi-Naoufal/wedding-invite/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/Elouahabi-Naoufal/wedding-invite/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

This is a digital wedding invitation for Zakaria and Bouthaina. The page is in Arabic and renders
right-to-left, with an animated envelope-and-wax-seal opening sequence followed by the invitation
content: a Quranic verse, the couple's names, date, venue, a map link and the evening programme.

Guests can respond through a form that records:

* Name
* Attendance (yes/no)
* Whether they are bringing a companion
* Number of seats
* Transport preference
* Dietary notes
* A message to the couple

A lightweight admin page shows attendance counts, confirmed seats and the full guest list. The
application is a single Flask file with SQLAlchemy models; the template data is currently defined
in the `WEDDING` dictionary in `app.py`.

The Docker setup runs the app with PostgreSQL. Without a `DATABASE_URL`, the app falls back to a
local SQLite database.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Python][Python]][Python-url]
* [![Flask][Flask]][Flask-url]
* [![SQLAlchemy][SQLAlchemy]][SQLAlchemy-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Docker][Docker]][Docker-url]
* HTML, CSS and JavaScript

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

* Python 3.10+ and pip
* PostgreSQL, or SQLite for local development

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Elouahabi-Naoufal/wedding-invite.git
   cd wedding-invite/template-zakaria-boutaina
   ```

2. Create a virtual environment and install dependencies
   ```sh
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

3. Set the admin key and, optionally, a database URL
   ```sh
   export ADMIN_KEY="replace-with-a-private-key"
   # export DATABASE_URL="postgresql+psycopg2://postgres:postgres@localhost:5432/wedding"
   ```

4. Run the app
   ```sh
   python app.py
   ```

5. Open <http://localhost:5000>

Docker with PostgreSQL:
```sh
docker compose up --build -d
```
The compose file does not publish a host port, so put it behind a reverse proxy or add a
`ports` mapping for local access.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

* `/` — the invitation. Click the wax seal to open the envelope and reveal the details.
* The RSVP form posts to `/api/rsvp` and stores the response in the `rsvp` table.
* `/admin?key=YOUR_ADMIN_KEY` — attendance totals and the guest list.
* `GET /api/responses?key=YOUR_ADMIN_KEY` — the same data as JSON.

The admin key defaults to `admin123` when `ADMIN_KEY` is not set. Set a private value before
sharing the site.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [x] Animated Arabic RTL invitation
- [x] RSVP form with seats, companion, transport, dietary notes and message
- [x] Admin attendance summary and guest list
- [x] SQLite fallback and PostgreSQL Docker setup
- [ ] Move the couple, date, venue and programme out of the `WEDDING` dictionary into the database
- [ ] Add a template selector so the same app can serve multiple weddings
- [ ] Replace the query-string admin key with proper authentication
- [ ] Publish a host port or document the reverse-proxy setup in the compose file
- [ ] Add tests for RSVP validation and admin access

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire,
and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/Elouahabi-Naoufal/wedding-invite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Elouahabi-Naoufal/wedding-invite" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

This project is not licensed — all rights reserved.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Naoufal Elouahabi - [LinkedIn](https://www.linkedin.com/in/elouahabi-naoufal/) - elouahabi-naoufal1@gmail.com

Project Link: [https://github.com/Elouahabi-Naoufal/wedding-invite](https://github.com/Elouahabi-Naoufal/wedding-invite)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [Flask](https://flask.palletsprojects.com/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/Elouahabi-Naoufal/wedding-invite.svg?style=for-the-badge
[contributors-url]: https://github.com/Elouahabi-Naoufal/wedding-invite/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Elouahabi-Naoufal/wedding-invite.svg?style=for-the-badge
[forks-url]: https://github.com/Elouahabi-Naoufal/wedding-invite/network/members
[stars-shield]: https://img.shields.io/github/stars/Elouahabi-Naoufal/wedding-invite.svg?style=for-the-badge
[stars-url]: https://github.com/Elouahabi-Naoufal/wedding-invite/stargazers
[issues-shield]: https://img.shields.io/github/issues/Elouahabi-Naoufal/wedding-invite.svg?style=for-the-badge
[issues-url]: https://github.com/Elouahabi-Naoufal/wedding-invite/issues
[license-shield]: https://img.shields.io/badge/license-none-lightgrey?style=for-the-badge
[license-url]: #license
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/elouahabi-naoufal/
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[SQLAlchemy]: https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white
[SQLAlchemy-url]: https://www.sqlalchemy.org/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
