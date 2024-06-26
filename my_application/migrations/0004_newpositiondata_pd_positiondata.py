# Generated by Django 5.0 on 2023-12-11 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_application', '0003_alter_test_demo'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewPositionData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position_name', models.CharField(default='', max_length=20, unique=True)),
                ('position_description', models.CharField(max_length=20)),
                ('interview_stage', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='PD',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position_name', models.CharField(default='', max_length=20, unique=True)),
                ('position_description', models.CharField(max_length=20)),
                ('interview_stage', models.CharField(default='', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='positiondata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position_name', models.CharField(default='', max_length=20, unique=True)),
                ('position_description', models.CharField(max_length=20)),
                ('interview_stage', models.CharField(default='', max_length=50)),
            ],
        ),
    ]
