from pydantic import DirectoryPath, Field
from pydantic_settings import BaseSettings, SettingsConfigDict

from native_faucet.constants import PROJECT_PATH


class ProjectSettings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix='NF_',
        env_file_encoding='utf-8',
        env_nested_delimiter='__',
        coerce_numbers_to_str=True,
    )

    database_file_name: str = Field('')

    @property
    def database_file_path(self) -> DirectoryPath:
        return PROJECT_PATH / self.database_file_name


settings = ProjectSettings()
