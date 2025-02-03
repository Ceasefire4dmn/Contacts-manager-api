﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(SqliteDbContext))]
    [Migration("20250119225343_AddChanges")]
    partial class AddChanges
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.1");

            modelBuilder.Entity("Contact", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT")
                        .HasColumnName("contact_id");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT")
                        .HasColumnName("contact_email");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasColumnName("contact_name");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT")
                        .HasColumnName("contact_phone_number");

                    b.HasKey("Id");

                    b.ToTable("сontacts", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
