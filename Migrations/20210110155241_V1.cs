using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat_Backend.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kolekcija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naslov = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kolekcija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Lista",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    KolekcijaRefID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lista", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Lista_Kolekcija_KolekcijaRefID",
                        column: x => x.KolekcijaRefID,
                        principalTable: "Kolekcija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MojaBeleska",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Tekst = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DatumModifikacije = table.Column<DateTime>(type: "datetime2", nullable: false),
                    KolekcijaRefID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MojaBeleska", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MojaBeleska_Kolekcija_KolekcijaRefID",
                        column: x => x.KolekcijaRefID,
                        principalTable: "Kolekcija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Stavka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Podatak = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ListaRefID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stavka", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Stavka_Lista_ListaRefID",
                        column: x => x.ListaRefID,
                        principalTable: "Lista",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lista_KolekcijaRefID",
                table: "Lista",
                column: "KolekcijaRefID");

            migrationBuilder.CreateIndex(
                name: "IX_MojaBeleska_KolekcijaRefID",
                table: "MojaBeleska",
                column: "KolekcijaRefID");

            migrationBuilder.CreateIndex(
                name: "IX_Stavka_ListaRefID",
                table: "Stavka",
                column: "ListaRefID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MojaBeleska");

            migrationBuilder.DropTable(
                name: "Stavka");

            migrationBuilder.DropTable(
                name: "Lista");

            migrationBuilder.DropTable(
                name: "Kolekcija");
        }
    }
}
